"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import loginAdmin from "../auth/authAdmin";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, togglePassword] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const togglePasswordVisible = () => {
    togglePassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = loginAdmin(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
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
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Masukkan Email"
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
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukkan Kata Sandi"
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
      {error !== null ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="hidden"></p>
      )}
			
			<button type="submit"
					className="bg-sky-500 font-semibold text-white p-2 mt-4 rounded-lg w-full">
				Masuk
			</button>
    </form>
  );
};

export default LoginForm;
