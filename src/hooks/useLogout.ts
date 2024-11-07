import { useState } from "react";
import { auth, db } from "../firebase/Config";
import { signOut } from "firebase/auth";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const [ispending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // change the online/offline status
      const uid = user?.uid;
      if (uid) {
        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, {
          online: false,
        });
      } else {
        throw new Error("uid is undefined");
      }

      // sign/log users out
      await signOut(auth);

      // dispatch a logout action
      dispatch({ type: "LOGOUT" });

      // update states
      setError(null);
      setIsPending(false);
    } catch (err) {
      const error = err as FirestoreError;
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };

  return { error, ispending, logout };
};

export default useLogout;
