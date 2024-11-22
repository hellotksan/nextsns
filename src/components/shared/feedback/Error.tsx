import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Error: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mb-4 text-xl font-semibold">
        Oh, Error occuring!! Please Reload.
      </div>
      <Link href="/home" className="text-black">
        <Button variant="outline" className="hover:bg-gray-300">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default Error;
