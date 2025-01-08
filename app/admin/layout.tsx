"use client";
import { Poppins } from "next/font/google";
import "../globals.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BlockBackground from "../components/BlockBackground";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "300",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loadLogOut, setLoadLogOut] = useState(false);

  useEffect(() => {
    const checkAuthorized = async () => {
      const valid = await fetch("/api/validate");
      if (valid.status === 400) {
        router.push("/");
        return;
      } else {
        setAuthorized(true);
      }
    };
    checkAuthorized();
  }, [router]);

  const logOut = async (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    setLoadLogOut(true);
    const resLogOut = await fetch("/api/logout");
    if (resLogOut.status === 200) {
      router.push("/");
    } else {
      setLoadLogOut(false);
    }
  };

  if (!authorized) {
    return (
      <BlockBackground bgColor="">
        <Spinner />
      </BlockBackground>
    );
  }

  return (
    <main className={`${poppins.className} antialiased h-full`}>
      {loadLogOut &&
        <BlockBackground bgColor="bg-neutral-500/[0.5]">
          <Spinner />
        </BlockBackground>
      }
      <Header />
      <Sidebar logOut={logOut} />
      <div className="flex flex-col justify-center items-center md:ml-[220px] p-8 gap-8">
        {children}
      </div>
    </main>
  );
}
