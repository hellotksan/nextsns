import React, { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import PropTypes from "prop-types";

// 最初のユーザ情報を定義
const getSavedUser = () => {
  if (typeof window !== "undefined") {
    const savedUserString = localStorage.getItem("user");
    if (!savedUserString) {
      try {
        return JSON.parse(savedUserString);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        return null;
      }
    }
  }
  return null;
};

// 最初のユーザ情報を定義
const initialState = {
  user: getSavedUser(),
  isFetching: false,
  error: false,
};

// 状態をグローバルに管理する
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
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
