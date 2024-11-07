import React from "react";
import LoginButton from "./LoginButton";
import LoginForm from "./LoginForm";
import Image from "next/image";

const LoginCard = () => {
  return (
    <div className="w-full">
      <div className="flex items-center flex-col pb-10 w-full">
        <img src="/MKnows_Admin.png" alt="M-Knows Admin Logo" className="w-3/4" />
      </div>
      <LoginForm />
      <LoginButton />
    </div>
  );
};

export default LoginCard;
