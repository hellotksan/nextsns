"use client";

import { AuthContextProvider } from "../state/AuthContext";

export default function AuthProviderWrapper({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
