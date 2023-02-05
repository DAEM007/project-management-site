// All react imports
import { useState, useEffect, useRef } from "react";

// All firebase imports
import { db } from "../firebase/Config";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

const useCollection = (col, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    // query and orderBy arguments in the useCollection hook
    const q = useRef(_query).current;
    const order = useRef(_orderBy).current;

    useEffect(() => {
        // collection reference
        let colRef = collection(db, col);

        // check for a query argument
        if(query) {
            colRef = query(colRef, where(...q));
        }

        // check for a orderBy argument
        if(orderBy) {
            colRef = query(colRef, orderBy(...order));
        }

        // Fetch documents from the collection
        const unsub = onSnapshot(colRef, (snapshot) => {
            const results = [];
            snapshot.docs.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id })
            })
            // console.log(results);

            // update states
            setDocuments(results);
            setError(null);
        }, (err) => {
            console.log(err.message);
            setError('Could not fetch data from firebase collection');
        })

        return () => unsub()
        
    }, [col, q, order])

    return { documents, error };

}
 
export default useCollection;