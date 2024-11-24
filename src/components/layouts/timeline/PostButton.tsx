import React from "react";
import { useFormStatus } from "react-dom";

function PostButton() {
  const { pending } = useFormStatus();

  return (
    <div>
      <button
        className={`border-2 bg-black text-white py-1 px-4 rounded-md hover:bg-gray-400 transition
        ${pending && "cursor-not-allowed"}`}
        type="submit"
        disabled={pending}
      >
        {pending ? "投稿" : "投稿中..."}
      </button>
    </div>
  );
}

export default PostButton;
