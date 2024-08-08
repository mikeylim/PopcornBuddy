// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [sessionExpired, setSessionExpired] = useState(false);

	useEffect(() => {
		const token = Cookies.get("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	const login = (token) => {
		Cookies.set("token", token, { expires: 10 / 1440 }); // 10 minutes
		setIsLoggedIn(true);
		setSessionExpired(false);
	};

	const logout = () => {
		Cookies.remove("token");
		setIsLoggedIn(false);
		Router.push("/");
	};

	const checkAuth = () => {
		if (!isLoggedIn) return; // Check if the user is logged in
		const token = Cookies.get("token");
		if (!token) {
			setSessionExpired(true);
			setIsLoggedIn(false);
			Router.push("/");
		}
	};

	useEffect(() => {
		const interval = setInterval(checkAuth, 600000); // Check every 10 minute
		return () => clearInterval(interval);
	}, [isLoggedIn]);

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, login, logout, sessionExpired, setSessionExpired }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);