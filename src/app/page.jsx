"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Auth from "./components/Auth";

export default function Login() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      const { error: errorSignUp } = await supabase.auth.signUp({
        email,
        password,
      });
      if (errorSignUp) {
        console.log("Error Signing up : ", errorSignUp.message);
        return;
      }
      // After successful sign up, redirect to tasks page
      router.push("/tasks");
    } else {
      const { error: errorSignIn } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (errorSignIn) {
        console.log("Error Signing in : ", errorSignIn.message);
        return;
      }

      router.push("/tasks");
    }
  };

  return (
    <Auth
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isSignUp={isSignUp}
      setIsSignUp={setIsSignUp}
      handleSubmit={handleSubmit}
    />
  );
}
