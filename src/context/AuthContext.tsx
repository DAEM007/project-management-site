import React, { useEffect, createContext, useReducer } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/Config";

interface AuthState {
  user: User | null;
  authIsReady: boolean;
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "AUTH_IS_READY"; payload: User | null };

export const AuthContext = createContext<{
  user: User | null;
  authIsReady: boolean;
  dispatch: React.Dispatch<AuthAction>;
}>({
  user: null,
  authIsReady: false,
  dispatch: () => null,
});

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    // different cases for the dispatch actions
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    // default case for the dispatch action
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  authIsReady: false,
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // perform a check as a side effect to check if the user is logged in/NOT
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // dispatch an action after user is checked
      dispatch({ type: "AUTH_IS_READY", payload: user });
    });

    unsub();
  }, []);

  console.log(`AuthContext state: `, state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
