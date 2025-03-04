'use client'
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaGoogle, FaGithub, FaEnvelope } from 'react-icons/fa';

const CustomLoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  const loginWithGoogle = () => {
    loginWithRedirect({
      connection: 'google-oauth2'
    });
  };

  const loginWithGithub = () => {
    loginWithRedirect({
      connection: 'github'
    });
  };

  const loginWithEmail = () => {
    loginWithRedirect({
      screen_hint: 'login'
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button
              onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </button>
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={loginWithGoogle}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaGoogle className="h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
            </span>
            Continue with Google
          </button>
          
          <button
            onClick={loginWithGithub}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaGithub className="h-5 w-5 text-gray-300 group-hover:text-white" />
            </span>
            Continue with GitHub
          </button>
          
          <button
            onClick={loginWithEmail}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaEnvelope className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300" />
            </span>
            Sign in with Email
          </button>
        </div>
        
        <div className="flex items-center justify-center mt-6">
          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Need help signing in?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomLoginPage;