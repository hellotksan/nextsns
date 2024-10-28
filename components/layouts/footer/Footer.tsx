"use client";

import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setIsVisible(scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`w-full bg-gray-800 text-white py-4 text-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto">
        <p className="mb-2">
          <a
            href="https://github.com/hellotksan/nextsns"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GitHub: hellotksan/nextsns
          </a>
        </p>
        <p>&copy; 2024 hellotksan. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
