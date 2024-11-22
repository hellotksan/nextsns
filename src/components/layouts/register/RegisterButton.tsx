"use client";

import React from "react";
import { useFormStatus } from "react-dom";

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`h-12 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors ${
        pending && "cursor-not-allowed"
      }`}
      type="submit"
      disabled={pending}
    >
      {pending ? "送信中..." : "サインアップ"}
    </button>
  );
}

export default RegisterButton;
