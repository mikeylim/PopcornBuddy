// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [sessionExpired, setSessionExpired] = useState(false);

	useEffect(() => {
		const loadSession = async () => {
			try {
				const response = await axios.get("/api/auth/me");
				setIsLoggedIn(true);
				setUser(response.data.data);
			} catch (error) {
				setIsLoggedIn(false);
				setUser(null);
			}
		};

		loadSession();
	}, []);

	const login = (nextUser) => {
		setIsLoggedIn(true);
		setUser(nextUser);
		setSessionExpired(false);
	};

	const logout = async () => {
		try {
			await axios.post("/api/auth/logout");
		} catch (error) {
			console.error("Logout error:", error);
		}

		setIsLoggedIn(false);
		setUser(null);
		Router.push("/");
	};

	useEffect(() => {
		if (isLoggedIn) {
			const interval = setInterval(async () => {
				try {
					await axios.post("/api/auth/refresh");
				} catch (error) {
					console.error("Error refreshing token:", error);
					setSessionExpired(true);
					setIsLoggedIn(false);
					setUser(null);
					Router.push("/login");
				}
			}, 25 * 60 * 1000);

			return () => clearInterval(interval);
		}
	}, [isLoggedIn]);

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, user, login, logout, sessionExpired, setSessionExpired }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
