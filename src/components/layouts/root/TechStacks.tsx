import React from "react";

const TechStacks: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-gray-300 mb-2">
          Whats in Next SNS??
        </h2>

        <div className="my-10 mb-20">
          <div className="text-white text-lg text-center">
            <div>Introduce Using Tech Stacks on my Web.</div>
          </div>
        </div>

        <div className="w-full max-w-4xl rounded-lg p-6 bg-gray-800 text-white mt-10">
          <h2 className="text-3xl font-bold text-center mb-6">Tech Stacks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="flex justify-center items-center bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-xl font-semibold">React / Next.js</div>
            </div>
            <div className="flex justify-center items-center bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-xl font-semibold">Tailwind CSS</div>
            </div>
            <div className="flex justify-center items-center bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-xl font-semibold">TypeScript</div>
            </div>
            <div className="flex justify-center items-center bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-xl font-semibold">Vercel</div>
            </div>
            <div className="flex justify-center items-center bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-xl font-semibold">ESLint & Prettier</div>
            </div>
            <div className="flex justify-center items-center bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-xl font-semibold">Vitest</div>
            </div>
            <div className="flex justify-center items-center bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-xl font-semibold">ShadCn</div>
            </div>
            <div className="flex justify-center items-center bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-xl font-semibold">Redux</div>
            </div>
            <div className="flex justify-center items-center bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-xl font-semibold">NodeJs</div>
            </div>
            <div className="flex justify-center items-center bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-xl font-semibold">MongoDB</div>
            </div>
            <div className="flex justify-center items-center bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-xl font-semibold">Husky & ES-Linted</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStacks;
