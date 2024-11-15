"use client";
import { Poppins } from "next/font/google";
import "../globals.css";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "100",
});

export default function RootLayout({
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
    <main className="h-screen">
      <Header />
      <Sidebar logOut={logOut} />
      {children}
    </main>
  );
}
