"use client";

import { Provider } from "react-redux";
import store from "@/state/store";
import { ReactNode } from "react";

interface AuthProviderWrapperProps {
  children: ReactNode;
}

export default function AuthProviderWrapper({
  children,
}: AuthProviderWrapperProps) {
  return <Provider store={store}>{children}</Provider>;
}
