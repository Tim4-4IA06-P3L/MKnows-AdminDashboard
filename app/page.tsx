"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Toast from "./components/Toast";
import Spinner from "./components/Spinner";
import AdminLogo from "./components/AdminLogo";
import BlockBackground from "./components/BlockBackground";

export default function Home() {

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, togglePassword] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [showToast, setShowToast] = useState<boolean>(false);
	const [authorized, setAuthorized] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const checkValid = async () => {
		const valid = await fetch("api/validate");
		if (valid.status == 400) {
			setAuthorized(false);
		} else {
			router.push("/admin/dashboard");
		}
	};

	useEffect(() => {
		checkValid();
	}, [authorized]);

	const togglePasswordVisible = () => {
		togglePassword(!showPassword);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setError("");
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setError("");
	};

	const handleToast = () => {
		setShowToast(true);
		setTimeout(() => setShowToast(false), 5000);
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const loginReq = await fetch("/api/auth", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			console.log(loginReq);

			if (loginReq.status == 200) {
				router.push("/admin/dashboard");
			} else {
				setLoading(false);
				setError("Invalid email or password");
				handleToast();
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
			setError("Something's wrong");
			handleToast();
		}
	};

	if (authorized) {
		return (
			<BlockBackground bgColor="bg-white">
				<Spinner />
			</BlockBackground>
		);
	}

	return (
		<main className="flex items-center justify-center h-full">
			{showToast && (
				<Toast message={error} />
			)}

			{loading &&
				<BlockBackground bgColor="bg-white">
					<Spinner />
				</BlockBackground>
			}

			<div className="min-[320px]:max-sm:w-4/5 sm:w-2/5">
				<AdminLogo containerClassName="flex items-center flex-col pb-10 w-full" />
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
						required
						onChange={handleEmailChange}
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
							required
							onChange={handlePasswordChange}
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
						className="bg-sky-600 font-semibold text-white p-2 mt-4 rounded-lg w-full
						hover:bg-sky-700 active:ring-offset-1 active:ring-black active:ring-1 active:ring-offset-neutral-100"
					>
						Log In
					</button>
				</form>
			</div>
		</main>
	);
}
