// All react imports
import { useEffect, createContext, useReducer } from "react";
// All firebase imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Config";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        // different cases for the dispatch actions
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }
        // default case for the dispatch action
        default:
            return state;
    }
}

const initialState = {
    user: null,
    authIsReady: false
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // perform a check as a side effect to check if the user is logged in/NOT
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            // dispatch an action after user is checked
            dispatch({ type: 'AUTH_IS_READY', payload: user })
        })

        unsub();

    }, [])

    console.log(`AuthContext state: `, state );

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )

}