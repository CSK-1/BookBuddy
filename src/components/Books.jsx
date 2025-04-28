import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AllBooks({ setBook, searchTerm }) {
	const [books, setBooks] = useState([]);
    const navigate = useNavigate();

	useEffect(() => {
		const getBooks = async () => {
			const res = await fetch(
				"https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
			);
			const data = await res.json();

			setBooks(data);
		};
		getBooks();
	}, []);

	const handleClick = (book) => {
		navigate(`/books/${book.id}`);
	};

	const filteredBooks = books.filter((book) =>
		book.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<div className="bookslist">
				<h2>Book Buddy Catalog:</h2>
				<div>
					{filteredBooks.map((book) => (
						<div key={book.id}>
							<h3>{book.title}</h3>
							<img src={book?.coverimage} style={{ height: "400px" }} />
							<p>By {book.author}</p>
							<button onClick={() => handleClick(book)}>More Details</button>
						</div>
					))}
					{filteredBooks.length === 0 && <p>No books match your search.</p>}
				</div>
			</div>
		</>
	);
}

export default AllBooks;
