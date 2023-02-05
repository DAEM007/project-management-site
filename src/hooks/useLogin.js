// All react imports
import { useState } from "react";
// All firebase imports
import { auth } from "../firebase/Config";
import { signInWithEmailAndPassword } from "firebase/auth";
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