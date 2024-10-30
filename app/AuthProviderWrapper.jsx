"use client";

import { Provider } from "react-redux";
import store from "@/state/store";

export default function AuthProviderWrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
