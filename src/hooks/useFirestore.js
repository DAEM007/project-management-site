// All react imports
import { useReducer } from "react";
// All firebase imports
import { db, timestamp } from "../firebase/Config";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";

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
        // check action type for Adddoc
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
        // check action for error
        case 'ERROR':
            return {
                error: action.payload,
                isPending: false,
                document: null,
                success: false
            }

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

    // collection reference
    const colRef = collection(db, col);

   // Add document to firebase
   const AddDocument = async (doc) => {
        // update isPending state
        dispatch({ type:'IS_PENDING' })

        try{
            const docAdded = await addDoc(colRef, { ...doc, created_at: timestamp.now() } );
            // update document state
            dispatch({ type:'ADD_DOC', payload: docAdded })
        }
        catch(err){
            // update error state
           dispatch({ type:'ERROR', payload: err.message })
        }

   }

    // Delete document from firebase
   const DeleteDocument = async (id) => {
        // update isPending state
        dispatch({ type: 'IS_PENDING' })

        try {
            await deleteDoc(doc(colRef, id));
            // update document state
            dispatch({ type: 'DELETE_DOC' })
        }
        catch(err) {
            // update error state
            dispatch({ type:'ERROR', payload: 'could not delete document' })
        }

   }

   return { response, AddDocument, DeleteDocument };

}
 
export default useFirestore;