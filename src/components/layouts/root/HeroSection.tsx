import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl rounded-lg p-6">
          <h1 className="text-7xl font-bold text-center text-gray-300 mb-6">
            Next SNS
          </h1>

          <div className="my-20">
            <div className="text-white text-lg text-center">
              <div>The SNS Application for the Web with NextJs.</div>
              <div>You can Use This App or Create with Us to Contribute!!</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-20">
            <Link href="/home" className="text-black">
              <Button variant="outline" className="bg-gray-100 hover:bg-gray-300">
                Get Started
              </Button>
            </Link>
            <Link
              href="https://github.com/hellotksan/nextsns"
              className="text-white"
            >
              <Button
                variant="outline"
                className="bg-gray-900 hover:bg-gray-700 hover:text-white"
              >
                Fork Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
