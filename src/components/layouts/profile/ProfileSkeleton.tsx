import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="p-4 mt-5 shadow-md rounded-lg max-w-xl mx-auto">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </div>
      <div className="mt-5 text-lg">
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
