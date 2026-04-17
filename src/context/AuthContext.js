// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [authResolved, setAuthResolved] = useState(false);

	const clearAuthState = () => {
		setIsLoggedIn(false);
		setUser(null);
	};

	const fetchCurrentUser = async () => {
		const response = await axios.get("/api/auth/me");
		setIsLoggedIn(true);
		setUser(response.data.data);
		return response.data.data;
	};

	useEffect(() => {
		const loadSession = async () => {
			try {
				await fetchCurrentUser();
			} catch (error) {
				const status = error.response?.status;

				if (status === 401 || status === 403) {
					try {
						await axios.post("/api/auth/refresh");
						await fetchCurrentUser();
					} catch (refreshError) {
						clearAuthState();
					}
				} else {
					clearAuthState();
				}
			} finally {
				setAuthResolved(true);
			}
		};

		loadSession();
	}, []);

	const login = (nextUser) => {
		setIsLoggedIn(true);
		setUser(nextUser);
	};

	const logout = async () => {
		try {
			await axios.post("/api/auth/logout");
		} catch (error) {
			console.error("Logout error:", error);
		}

		clearAuthState();
		Router.push("/");
	};

	useEffect(() => {
		if (isLoggedIn && authResolved) {
			const expireSession = async () => {
				try {
					await axios.post("/api/auth/logout");
				} catch (error) {
					console.error("Logout error after session expiry:", error);
				}

				clearAuthState();
				toast.error("Your session expired. Please log in again.", {
					position: "top-right",
				});
				Router.push("/login");
			};

			const interval = setInterval(async () => {
				try {
					await axios.post("/api/auth/refresh");
				} catch (error) {
					console.error("Error refreshing token:", error);
					await expireSession();
				}
			}, 25 * 60 * 1000);

			return () => clearInterval(interval);
		}
	}, [authResolved, isLoggedIn]);

	return (
		<AuthContext.Provider value={{ isLoggedIn, user, login, logout, authResolved }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
