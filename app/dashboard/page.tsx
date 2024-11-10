"use client";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const logOut = async (e) => {
    e.preventDefault();
    const resLogOut = await fetch("/api/logout");
    if (resLogOut.status === 200) {
      router.push("/");
    } else {
      const message = resLogOut.json().then((data) => data.message);
      console.log(message);
    }
  };
  return (
    <>
      <button type="submit" onClick={logOut}>
        Log Out
      </button>
    </>
  );
};

export default page;
