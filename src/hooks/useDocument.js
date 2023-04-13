// All react imports
import { useEffect, useState } from "react";
// All firebase imports
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/Config";

const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    // get realtime updates for each documents
    useEffect(() => {
        const docRef = doc(db, collection, id);

        const unsub = onSnapshot(docRef, (snapshot) => {
            // check if document exists & has data
            if(snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id });
                setError(null);
            } else {
                setError('No such document exists');
            }
        }, err => {
            console.log(err.message);
            setError('Failed to get document!');
        })

        // unsubscribe on unmount
        return () => unsub();

    }, [collection, id])

    return {document, error};

}
 
export default useDocument;
