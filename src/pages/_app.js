// pages/_app.js
import { useEffect } from "react";
import Router from "next/router";
import "../styles/globals.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SessionTimeoutHandler />
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

const SessionTimeoutHandler = () => {
  const { sessionExpired, setSessionExpired } = useAuth();

  useEffect(() => {
    if (sessionExpired) {
      alert("Your session has timed out and you have been automatically logged out.");
      setSessionExpired(false);
      Router.push("/");
    }
  }, [sessionExpired, setSessionExpired]);

  return null;
};

export default MyApp;



// // pages/_app.js
// import { useEffect } from "react";
// import Router from "next/router";
// import "../styles/globals.css";
// import { AuthProvider, useAuth } from "../context/AuthContext";
// import NavBar from "../components/NavBar";

// function MyApp({ Component, pageProps }) {
// 	return (
// 		<AuthProvider>
// 			<SessionTimeoutHandler />
// 			<NavBar />
// 			<Component {...pageProps} />
// 		</AuthProvider>
// 	);
// }

// const SessionTimeoutHandler = () => {
// 	const { sessionExpired, setSessionExpired } = useAuth();

// 	useEffect(() => {
// 		if (sessionExpired) {
// 			alert("Your session has timed out and you have been automatically logged out.");
// 			setSessionExpired(false);
// 			Router.push("/");
// 		}
// 	}, [sessionExpired, setSessionExpired]);

// 	return null;
// };

// export default MyApp;
