"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Toast from "./components/Toast";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, togglePassword] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const togglePasswordVisible = () => {
    togglePassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const valid = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (valid.status == 200) {
        router.push("/dashboard");
      } else {
        setError("Invalid email or password");
        handleToast();
      }
    } catch (err) {
      console.log(err.message);
      setError("Something's wrong");
      handleToast();
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      {showToast && (
        <Toast message={error} onClose={() => setShowToast(false)} />
      )}
      <div className="w-2/5">
        <div className="w-full">
          <div className="flex items-center flex-col pb-10 w-full">
            <img
              src="/MKnows_Admin.png"
              alt="M-Knows Admin Logo"
              className="w-3/4"
            />
          </div>
          <form method="POST" onSubmit={handleLogin}>
            <label htmlFor="email" className="font-medium mb-4">
              Email
            </label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => handleEmailChange(e)}
              placeholder="Enter your email"
              className="bg-neutral-100 rounded-md mb-3 h-10 p-4 w-full border-2"
            />
            <br />
            <label htmlFor="password" className="font-medium mb-4">
              Kata Sandi
            </label>
            <br />
            <div className="relative h-10 w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => handlePasswordChange(e)}
                placeholder="Enter your password"
                className="bg-neutral-100 rounded-md h-full p-4 w-full mb-4 border-2"
              />
              <button
                type="button"
                onClick={togglePasswordVisible}
                className="absolute right-3.5 top-3.5"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-3 w-3" />
                ) : (
                  <EyeIcon className="h-3 w-3" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="bg-sky-500 font-semibold text-white p-2 mt-4 rounded-lg w-full"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
