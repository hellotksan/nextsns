import React from "react";
import { useFormStatus } from "react-dom";

function PostButton() {
  const { pending } = useFormStatus();

  return (
    <div>
      <button
        className={`bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-900 transition
        ${pending && "cursor-not-allowed"}`}
        type="submit"
        disabled={pending}
      >
        投稿
      </button>
    </div>
  );
}

export default PostButton;
