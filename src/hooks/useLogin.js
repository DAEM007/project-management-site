// All react imports
import { useState } from "react";
// All firebase imports
import { auth, db } from "../firebase/Config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
// All hooks import
import { useAuthContext } from "./useAuthContext";


const useLogin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    
    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        try{
            // Log users in
            const cred = await signInWithEmailAndPassword(auth, email, password);
            // console.log({user: cred.user});

            // change the online/offline status of the users
            const docRef = doc(db, "users", cred.user.uid);
            await updateDoc(docRef, {
                online: true
            });

            // If we don't get a response for the cred then we need to throw an error
            if(!cred){
                throw Error('could not complete login!');
            }

            // dispatch a login action similar to the signup
            dispatch({ type: 'LOGIN', payload: cred.user });

            // update states 
            setError(null);
            setIsPending(false);
           
        }
        catch(err) {
           
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
            
            
        }
    }

    return { error, isPending, login };

}
 
export default useLogin;