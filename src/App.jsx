import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import bookLogo from "./assets/books.png";
import AllBooks from "./components/Books";
import SingleBook from "./components/SingleBook";
import LogIn from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Navigations from "./components/Navigations";

function App() {
	const [token, setTokenState] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const savedToken = localStorage.getItem("token");
		if (savedToken) {
			setTokenState(savedToken);
		}
	}, []);

	return (
		<>
			<Navigations token={token} />
			<h1 className="title">
				<img id="logo-image" src={bookLogo} />
				Book Buddy
			</h1>
			<Routes>
				<Route path="/" element={<AllBooks searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
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
					element={<Account setTokenState={setTokenState} />}
				/>
			</Routes>
		</>
	);
}

export default App;
