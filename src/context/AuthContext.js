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
    const interval = setInterval(checkAuth, 20000); // Check every minute
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, sessionExpired, setSessionExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// // context/AuthContext.js
// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import Router from "next/router";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
// 	const [isLoggedIn, setIsLoggedIn] = useState(false);
// 	const [sessionExpired, setSessionExpired] = useState(false);

// 	useEffect(() => {
// 		const token = localStorage.getItem("token");
// 		if (token) {
// 			setIsLoggedIn(true);
// 		}
// 	}, []);

// 	const login = (token) => {
// 		localStorage.setItem("token", token);
// 		setIsLoggedIn(true);
// 		setSessionExpired(false);
// 	};

// 	const logout = () => {
// 		localStorage.removeItem("token");
// 		setIsLoggedIn(false);
// 		Router.push("/");
// 	};

// 	const checkAuth = async () => {
// 		try {
// 			await axios.get("/api/protectedRoute");
// 		} catch (error) {
// 			if (error.response && error.response.status === 401) {
// 				setSessionExpired(true);
// 				setIsLoggedIn(false);
// 				Router.push("/");
// 			}
// 		}
// 	};

// 	useEffect(() => {
// 		const interval = setInterval(checkAuth, 10000); // Check every minute
// 		return () => clearInterval(interval);
// 	}, []);

// 	return (
// 		<AuthContext.Provider
// 			value={{ isLoggedIn, login, logout, sessionExpired, setSessionExpired }}>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };

// export const useAuth = () => useContext(AuthContext);
