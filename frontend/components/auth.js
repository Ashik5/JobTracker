import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from 'next/navigation';

const AuthComponent = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await fetch('http://localhost:3001/users/check-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              auth0Id: user.sub,
              name: user.name,
              picture: user.picture
            }),
          });

          const data = await response.json();

          if (data.isNewUser) {
            // Store temp user data in localStorage or state management
            localStorage.setItem('tempUserData', JSON.stringify(data.tempUserData));
            // Redirect to signup page
            router.push('/signup');
          }
        } catch (error) {
          console.error('Error checking user:', error);
        }
      }
    };

    // Only run checkUser if we're authenticated and have user data
    if (isAuthenticated && user) {
      checkUser();
    }
  }, [isAuthenticated, user, router.isReady]); // Add router.isReady to dependencies

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img 
            src={user.picture} 
            alt={user.name || "User avatar"} 
            className="w-8 h-8 rounded-full" 
          />
          <span className="text-sm font-medium">{user.name}</span>
        </div>
        <button 
          onClick={() => logout({ returnTo: window.location.origin })}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => loginWithRedirect()}
      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Log In
    </button>
  );
};

export default AuthComponent;