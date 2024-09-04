import React, { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(savedUser) });
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      Cookies.set("user", JSON.stringify(state.user), {
        secure: true,
        sameSite: "Strict",
        expires: 7,
        path: "/",
      });
    } else {
      Cookies.remove("user");
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
