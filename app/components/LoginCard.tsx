import React from "react";
import LoginForm from "./LoginForm";

const LoginCard = () => {
  return (
    <div className="w-full">
      <div className="flex items-center flex-col pb-10 w-full">
        <img
          src="/MKnows_Admin.png"
          alt="M-Knows Admin Logo"
          className="w-3/4"
        />
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginCard;
