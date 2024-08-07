// pages/Signup.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Signup = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const router = useRouter();

	const { firstName, lastName, email, password } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const res = await axios.post("/api/auth/signup", formData);
			console.log(res.data);
			// Handle successful signup
			router.push("/login");
		} catch (err) {
			console.error("Signup error:", err.response?.data);
			setError(err.response?.data?.error || "An unexpected error occurred");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
			<h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
			{error && <p className="text-red-500 text-center mb-4">{error}</p>}
			<form onSubmit={onSubmit} className="space-y-4">
				<div>
					<label htmlFor="firstName" className="block text-sm font-medium">
						First Name:
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={firstName}
						onChange={onChange}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div>
					<label htmlFor="lastName" className="block text-sm font-medium">
						Last Name:
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={lastName}
						onChange={onChange}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div>
					<label htmlFor="email" className="block text-sm font-medium">
						Email:
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={onChange}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div>
					<label htmlFor="password" className="block text-sm font-medium">
						Password:
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={onChange}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 px-4 bg-indigo-950 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
					Sign Up
				</button>
			</form>

			<a href="/login">
				<p className="w-full mt-3 text-indigo-950 text-center">
					Already have a PopcornBuddy account?{" "}
					<span className="underline text-sky-600">Log In</span>
				</p>
			</a>
		</div>
	);
};

export default Signup;
