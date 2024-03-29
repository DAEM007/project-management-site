// All react imports
import { useReducer, useState, useEffect } from "react";
// All firebase imports
import { db, timestamp } from "../firebase/Config";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

// reducer function
const firestoreReducer = (action, state) => {
    switch (action.type) {
        // check action type for isPending
        case 'IS_PENDING':
            return {
                error: null,
                isPending: true,
                document: null,
                success: false
            }
        // check action type for AddDoc
        case 'ADD_DOC':
            return {
                error: null,
                isPending: false,
                document: action.payload,
                success: true
            }
        // check action type for DeleteDoc
        case 'DELETE_DOC':
            return {
                error: null,
                isPending: false,
                document: null,
                success: true
            }    
        // check for updated documents
        case 'UPDATED_DOCUMENT':
            return {
                error: null,
                isPending: false,
                document: action.payload,
                success: true
            }
        // check action for error
        case 'ERROR':
            return {
                error: action.payload,
                isPending: false,
                document: null,
                success: false
            }
        // return default state
        default:
            return state;
    }
}

// inital state
const initialState = {
    error: null,
    isPending: false,
    document: null,
    success: null
}

const useFirestore = (col) => {
   const [response, dispatch] = useReducer(firestoreReducer, initialState);
   const [isCancelled, setIsCancelled] = useState(false);

    // collection reference
    const colRef = collection(db, col);

    // only dispatch is not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
        dispatch(action)
        }
    }

   // Add document to firebase
   const AddDocument = async (doc) => {
        // update isPending state
        dispatch({ type:'IS_PENDING' })

        try{
            const docAdded = await addDoc(colRef, { ...doc, created_at: timestamp.now() } );
            // update document state
            dispatchIfNotCancelled({ type:'ADD_DOC', payload: docAdded })
        }
        catch(err){
            // update error state
           dispatchIfNotCancelled({ type:'ERROR', payload: err.message })
        }

   }

    // Delete document from firebase
   const DeleteDocument = async (id) => {
        // update isPending state
        dispatch({ type: 'IS_PENDING' })

        try {
            await deleteDoc(doc(colRef, id));
            // update document state
            dispatchIfNotCancelled({ type: 'DELETE_DOC' })
        }
        catch(err) {
            // update error state
            dispatchIfNotCancelled({ type:'ERROR', payload: 'could not delete document' })
        }

   }

    // update a document
    const updateDocument = async (id, updates) => {
        // update isPending state
        dispatch({ type: "IS_PENDING" })

        try {
            const updatedDocument = await updateDoc(doc(colRef, id), updates);
            dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDocument })
            return updatedDocument;
        } 
        catch (error) {
            dispatchIfNotCancelled({ type: "ERROR", payload: error })
            return null;
        }

    }


    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

   return { response, AddDocument, DeleteDocument, updateDocument };

}

export default useFirestore;