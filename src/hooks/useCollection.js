// All react imports
import { useState, useEffect, useRef } from "react";
// All firebase imports
import { db } from "../firebase/Config";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

const useCollection = (col, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    // query and orderBy arguments in the useCollection hook
    const q = useRef(_query).current;
    const order = useRef(_orderBy).current;

    useEffect(() => {
        // start fetch
        setIsPending(true);
        // collection reference
        let colRef = collection(db, col);

        // check for a query argument
        if(q) {
            colRef = query(colRef, where(...q));
        }

        // check for a orderBy argument
        if(order) {
            colRef = query(colRef, orderBy(...order));
        }

        // Fetch documents from the collection
        const unsub = onSnapshot(colRef, (snapshot) => {
            let results = [];
            snapshot.docs.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id })
            });
            // console.log(results);

            // update states
            setDocuments(results);
            setError(null);
            setIsPending(false);
        }, (err) => {
            console.log(err.message);
            setError('Could not fetch data from firebase collection');
            setIsPending(false);
        })

        return () => unsub()
        
    }, [col, q, order])

    return { documents, error, isPending };

}
 
export default useCollection;