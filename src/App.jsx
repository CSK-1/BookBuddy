import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import bookLogo from "./assets/books.png";
import AllBooks from "./components/Books";
import SingleBook from "./components/SingleBook";
import LogIn from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";

function App() {
	const [token, setTokenState] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	const setToken = (newToken) => {
		setTokenState(newToken);
		if (newToken) {
			localStorage.setItem("token", newToken);
		} else {
			localStorage.removeItem("token");
		}
	};

	useEffect(() => {
		const savedToken = localStorage.getItem("token");
		if (savedToken) {
			setTokenState(savedToken);
		}
	}, []);

	let navBar = <Link to="/login">Log In</Link>;

	if (!!token) {
		navBar = <Link to="/account">Account</Link>;
	}

	return (
		<>
			<nav>
				<Link to="/">Home</Link>
				<input
					type="text"
					placeholder="Search book titles..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					style={{ marginLeft: "1rem", flexGrow: 1, maxWidth: "300px" }}
				/>
				{navBar}
			</nav>
			<h1>
				<img id="logo-image" src={bookLogo} />
				Library App
			</h1>
			<Routes>
				<Route path="/" element={<AllBooks searchTerm={searchTerm} />} />
				<Route path="/books/:id" element={<SingleBook />} />
				<Route
					path="/login"
					element={<LogIn setTokenState={setTokenState} />}
				/>
				<Route
					path="/register"
					element={<Register setTokenState={setTokenState} />}
				/>
				<Route
					path="/account"
					element={<Account token={token} setTokenState={setTokenState} />}
				/>
			</Routes>
		</>
	);
}

export default App;
