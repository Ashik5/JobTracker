"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext"; // Ensure you have an AuthContext
import Image from "next/image";

const AuthComponent = () => {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext); // Getting user & logout function

  console.log("AuthComponent - User:", user);


  if (!user) {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => router.push("/login")}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Log In
        </button>
        <button
          onClick={() => router.push("/signup")}
          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Image
          src={user.picture || "/default-avatar.png"}
          alt={user.name || "User avatar"}
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium">{user.name}</span>
      </div>
      <button
        onClick={logout}
        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Log Out
      </button>
    </div>
  );
};

export default AuthComponent;