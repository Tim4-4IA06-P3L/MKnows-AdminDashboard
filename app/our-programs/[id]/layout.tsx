"use client";
import { Poppins } from "next/font/google";
import "../../globals.css";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "300",
});

export default function AddLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const checkAuthorized = async () => {
    const valid = await fetch("/api/validate");
    if (valid.status === 400) {
      router.push("/");
      return;
    } else {
      setAuthorized(true);
    }
  };

  useEffect(() => {
    checkAuthorized();
  }, []);

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

  if (!authorized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <main className={`${poppins.className} antialiased h-screen`}>
      {children}
    </main>
  );
}
