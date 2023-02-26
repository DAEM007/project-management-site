// All react imports
import { useState } from "react";
// Firebase imports
import { auth, storage, db } from "../firebase/Config";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// all hooks import
import { useAuthContext } from "./useAuthContext";



const useSignup = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const signUp = async (email, password, name, thumbnail) => {
        setError(null);
        setIsPending(true);

        try{
            // signup users
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            // console.log(cred.user);

            // If we don't get a response for cred then we need to throw an error
            if(!cred){
                throw new Error('Could not complete signup!');
            }

            // upload user thumbnail
            const uploadPath = `thumbnails/${cred.user.uid}/${thumbnail.name}`;
            const avatarRef = ref(storage, uploadPath);
            await uploadBytes(avatarRef, thumbnail);
            const avatarUrl = await getDownloadURL(avatarRef);

            // If we do get a response for cred then we can update the user's information
            await updateProfile(cred.user, { displayName: name, photoURL: avatarUrl });

            // create a user document in firebase firestore
            const docRef = doc(db, "users", cred.user.uid);
            await setDoc(docRef, {
                online: true,
                displayName: name,
                photoURL: avatarUrl
            });

            // dispatch an action to Signup/Login
            dispatch({type: 'LOGIN', payload: cred.user});

            // update states
            setError(null);
            setIsPending(false);
            
        }
        catch(err){
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
        
    }

    // return the destructured form of all variables and functions to be used
    return {error, isPending, signUp}

}
 
export default useSignup;