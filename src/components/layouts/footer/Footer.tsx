import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 text-center transition-opacity duration-500">
      <div className="container mx-auto my-10">
        <div className="my-5">
          <Link
            href="https://github.com/hellotksan/nextsns"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GitHub: hellotksan/nextsns
          </Link>
        </div>
        <div className="my-5">&copy; 2024 hellotksan. All Rights Reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
