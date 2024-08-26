import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const UpdateInfo = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/update.md")
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        アップデート情報
      </h2>
      <div className="prose">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default UpdateInfo;
