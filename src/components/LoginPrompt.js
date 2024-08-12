// components/LoginPrompt.js
import React from "react";
import { useRouter } from "next/router";
import { FaTimes, FaList } from "react-icons/fa";

const LoginPrompt = ({ onClose }) => {
	const router = useRouter();

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
				<button
					className="absolute top-3 right-3 text-gray-500 hover:text-red-500 focus:outline-none"
					onClick={onClose}>
					<FaTimes size={20} />
				</button>
				<h2 className="text-center text-xl font-semibold mb-4">
					Please sign up or login to use the service.
				</h2>
				<div className="flex justify-center">
					<button
						className="btn-submit w-full py-2 px-4 font-semibold rounded-md shadow-md focus:outline-none focus:ring-[#1f2937] focus:border-[#1f2937]"
						onClick={() => router.push("/signup")}>
						Sign Up
					</button>
				</div>
				<div className="flex justify-center">
					<button
						className="mt-2 w-full py-2 px-4 font-semibold rounded-md shadow-md bg-[#d4d4d5] focus:outline-none focus:ring-[#1f2937] focus:border-[#1f2937]"
						onClick={() => router.push("/login")}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPrompt;
