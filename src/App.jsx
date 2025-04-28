import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom'
import bookLogo from "./assets/books.png";
import AllBooks from "./components/Books";
import SingleBook from "./components/SingleBook";
import LogIn from "./components/Login";
import Register from "./components/Register";

function App() {
	const [token, setToken] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

  let navBar = (
			<Link to="/login">Log In</Link>
	);

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
        <Route path="/" element={<AllBooks searchTerm={searchTerm}/>}/>
        <Route path="/books/:id" element={<SingleBook/>}/>
        <Route path="/login" element={<LogIn setToken={setToken} />} />
				<Route path="/register" element={<Register setToken={setToken} />} />
      </Routes>
		</>
	);
}

export default App;
