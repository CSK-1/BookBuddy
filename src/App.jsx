import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom'
import bookLogo from "./assets/books.png";
import AllBooks from "./components/Books";

function App() {
	const [token, setToken] = useState(null);
	const [book, setBook] = useState();
	const [searchTerm, setSearchTerm] = useState("");

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
				<Link to="/login">Log In</Link>
			</nav>
			<h1>
				<img id="logo-image" src={bookLogo} />
				Library App
			</h1>
      <Routes>
        <Route path="/" element={<AllBooks setBook={setBook} searchTerm={searchTerm}/>}/>
        {/* <Route path="/books/:id" element={<SingleBook/>}/>
        <Route path="/login" element={<LogIn/>}/> */}
      </Routes>
		</>
	);
}

export default App;
