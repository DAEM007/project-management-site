// All react imports
import { useState } from "react";
// Firebase imports
import { auth } from "../firebase/Config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// all hooks import
import { useAuthContext } from "./useAuthContext";


const useSignup = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const signUp = async (email, password, name) => {
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

            // If we do get a response for cred then we can update the user's information
            await updateProfile(cred.user, { displayName: name });

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