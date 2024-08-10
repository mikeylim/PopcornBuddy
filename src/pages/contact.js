// pages/contact.js
import React, { useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";

const ContactPage = ({ userSession }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		reason: "",
		message: "",
	});
	const [status, setStatus] = useState("");

	// If the user is not authenticated, show a message
	if (!userSession) {
		return <p>You need to be logged in to contact us.</p>;
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
			// Combine form data with the user's email from the session
			const response = await axios.post("/api/contact", {
				...formData,
				email: userSession.email,
			});

			if (response.status === 200) {
				setStatus("Message sent successfully!");
				setFormData({
					name: "",
					email: "",
					phone: "",
					reason: "",
					message: "",
				});
			} else {
				setStatus("Error sending message.");
			}
		} catch (error) {
			setStatus("Error sending message: " + error.message);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-md text-purple-700">
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

// Fetch session data on the server side
export async function getServerSideProps(context) {
	const session = await getSession(context);

	return {
		props: {
			userSession: session?.user || null, // Pass user session data to the page component
		},
	};
}

export default ContactPage;
