
'use client'
import Dashboard from '@/components/Dashboard';
import Login from '@/app/login/page';
import { useState } from 'react';

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Start with user not logged in

  const handleLogout = () => {
    setIsLoggedIn(false); // Set user to logged out
    // Additional logic here like clearing local storage, etc.
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />; // Redirect to login page
  }
  else{
    return (
      <div>
        <Dashboard/>
        <div>
            <p>Welcome to the dashboard!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}
