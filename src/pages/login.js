// pages/login.js
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/auth/login", formData);
      console.log("Login successful:", res.data);
      login(res.data.token); // Pass the token to the login function
      router.push("/");
    } catch (err) {
      console.error("Login error:", err.response?.data);
      setError(err.response?.data?.error || "An unexpected error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-md text-purple-700">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
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
          className="w-full py-2 px-4 bg-indigo-950 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
      <a href="/signup">
        <p className="w-full mt-3 text-indigo-950 text-center">
          Don't have a PopcornBuddy account?{" "}
          <span className="underline text-sky-600">Sign Up</span>
        </p>
      </a>
    </div>
  );
};

export default Login;



// // pages/login.js
// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
// 	const [formData, setFormData] = useState({ email: "", password: "" });
// 	const [error, setError] = useState("");
// 	const router = useRouter();
// 	const { login } = useAuth();

// 	const { email, password } = formData;

// 	const onChange = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 	};

// 	const onSubmit = async (e) => {
// 		e.preventDefault();
// 		setError("");
// 		try {
// 			const res = await axios.post("/api/auth/login", formData);
// 			console.log("Login successful:", res.data);
// 			login(res.data.token); // Pass the token to the login function
// 			router.push("/");
// 		} catch (err) {
// 			console.error("Login error:", err.response?.data);
// 			setError(err.response?.data?.error || "An unexpected error occurred");
// 		}
// 	};

// 	return (
// 		<div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-md text-purple-700">
// 			<h1 className="text-2xl font-bold text-center mb-6">Login</h1>
// 			{error && (
// 				<div
// 					className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
// 					role="alert">
// 					{error}
// 				</div>
// 			)}
// 			<form onSubmit={onSubmit} className="space-y-4">
// 				<div>
// 					<label htmlFor="email" className="block text-sm font-medium">
// 						Email:
// 					</label>
// 					<input
// 						type="email"
// 						id="email"
// 						name="email"
// 						value={email}
// 						onChange={onChange}
// 						required
// 						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// 					/>
// 				</div>
// 				<div>
// 					<label htmlFor="password" className="block text-sm font-medium">
// 						Password:
// 					</label>
// 					<input
// 						type="password"
// 						id="password"
// 						name="password"
// 						value={password}
// 						onChange={onChange}
// 						required
// 						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// 					/>
// 				</div>
// 				<button
// 					type="submit"
// 					className="w-full py-2 px-4 bg-indigo-950 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
// 					Login
// 				</button>
// 			</form>
// 			<a href="/signup">
// 				<p className="w-full mt-3 text-indigo-950 text-center">
// 					Don't have a PopcornBuddy account?{" "}
// 					<span className="underline text-sky-600">Sign Up</span>
// 				</p>
// 			</a>
// 		</div>
// 	);
// };

// export default Login;
