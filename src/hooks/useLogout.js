// All react imports
import { useState } from "react";
// All firebase imports
import { auth, db } from "../firebase/Config";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
// All context imports
import { useAuthContext } from "./useAuthContext";


const useLogout = () => {
    const [error, setError] = useState(null);
    const [ispending, setIsPending] = useState(false);
    const { dispatch, user } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try{
            // change the online/offline status
            const { uid } = user;
            const docRef = doc(db, "users", uid);
            await updateDoc(docRef, {
                online: false
            })

            // sign/log users out
            await signOut(auth);

            // dispatch a logout action
            dispatch({ type: 'LOGOUT' });

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

    // return the destructured form of all variables and functions to be used
    return { error, ispending, logout };

}
 
export default useLogout;