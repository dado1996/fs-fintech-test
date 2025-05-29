"use client";
import Dashboard from "@/components/Dashboard";
import Login from "@/app/login/page";
import { useState } from "react";
import { toast, useToast } from "@/hooks/use-toast";
import { login } from "@/services/auth";
import { AxiosError } from "axios";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Start with user not logged in
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login(email, password);
      if (result.status !== 200) {
        toast({
          title: "Error",
          description: result.data.message,
        });
        return;
      }
      localStorage.setItem("token", result.data.data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast({
          title: "Error",
          description: error.response?.data.message,
        });
      } else {
        toast({
          title: "Error",
          description: "An unknown error has ocurred",
          duration: 4000,
        });
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false); // Set user to logged out
    // Additional logic here like clearing local storage, etc.
  };

  if (!isLoggedIn) {
    return (
      <>
        <Login
          onLogin={({ emailOrPhone, password }) =>
            handleLogin(emailOrPhone, password)
          }
        />
        <Toaster />
      </>
    ); // Redirect to login page
  } else {
    return (
      <div>
        <Dashboard />
        <div>
          <p>Welcome to the dashboard!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}
