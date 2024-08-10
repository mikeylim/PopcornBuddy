// pages/contact.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const ContactPage = () => {
	const { isLoggedIn, user } = useAuth();
	const [formData, setFormData] = useState({
		name: "",
		email: "", // Initialize email from Auth Context
		phone: "",
		reason: "",
		message: "",
	});
	const [status, setStatus] = useState("");

	useEffect(() => {
		if (user && user.email) {
			setFormData((prev) => ({ ...prev, email: user.email })); // Prefill email
		}
	}, [user]);

	if (!isLoggedIn) {
		return (
			<div className="flex flex-col mt-16 items-center justify-center">
				<div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
					<h2 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h2>
					<p className="text-gray-600 mb-6">
						You need to be logged in to contact us. Please log in to access the contact
						form.
					</p>
					<Link href="/login">
						<button className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
							Log In
						</button>
					</Link>
                    <Link href="/signup">
					<p className="mt-4 text-gray-500">
						Don’t have an account?{" "}
						
							<span className="underline-decoration font-medium cursor-pointer">
								Sign up here
							</span>
						
					</p>
                    </Link>
				</div>
			</div>
		);
	}

	const handleInputChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.post("/api/contact", formData);

			if (response.status === 200) {
				setStatus("Message sent successfully!");
				setFormData({
					name: "",
					email: formData.email || "",
					phone: "",
					reason: "",
					message: "",
				});
			} else {
				setStatus("Error sending message.");
			}
		} catch (error) {
			console.error("Error sending message:", error); // Log error for debugging
			setStatus("Error sending message: " + error.message);
		}
	};

	return (
		<div className="form-color max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
			<h1 className="text-2xl font-bold text-center mb-6">Contact Us</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="name" className="block text-sm font-medium">
						Name:
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
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
						value={formData.email}
						onChange={handleInputChange}
						required
						readOnly
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div>
					<label htmlFor="phone" className="block text-sm font-medium">
						Phone:
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleInputChange}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div>
					<label htmlFor="reason" className="block text-sm font-medium">
						Reason for Contacting:
					</label>
					<input
						type="text"
						id="reason"
						name="reason"
						value={formData.reason}
						onChange={handleInputChange}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div>
					<label htmlFor="message" className="block text-sm font-medium">
						Message:
					</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleInputChange}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-28 resize-none"
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
					Send
				</button>
			</form>
			{status && <p className="mt-4 text-center text-sm">{status}</p>}
		</div>
	);
};

export default ContactPage;
