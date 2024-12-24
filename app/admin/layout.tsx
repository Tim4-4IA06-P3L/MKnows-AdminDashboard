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
		setLoadLogOut(true);
    const resLogOut = await fetch("/api/logout");
    if (resLogOut.status === 200) {
      router.push("/");
    } else {
			setLoadLogOut(false);
      const message = resLogOut.json().then((data) => data.message);
      console.log(message);
    }
  };

  if (!authorized) {
    return (
			<BlockBackground>
        <Spinner />
      </BlockBackground>
    );
  }

  return (
		<main className={`${poppins.className} antialiased h-screen`}>
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
