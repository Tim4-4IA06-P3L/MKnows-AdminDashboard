"use client";
import React from "react";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

const LoginForm = () => {
  const [showPassword, togglePassword] = useState(false);

  const togglePasswordVisible = () => {
    togglePassword(!showPassword);
  };

  return (
    <div>
      <form method="POST" action="">
        <label htmlFor="username" className="font-medium mb-4">
          Username
        </label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Masukkan Username"
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
      </form>
    </div>
  );
};

export default LoginForm;
