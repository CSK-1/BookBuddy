import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AllBooks({ setBook, searchTerm }) {
	const [books, setBooks] = useState([]);
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const savedToken = localStorage.getItem("token");

	const getBooks = async () => {
		const res = await fetch(
			"https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
		);
		const data = await res.json();
		setBooks(data);
	};

	useEffect(() => {
		getBooks();
	}, []);

	const handleDetailsClick = (book) => {
		navigate(`/books/${book.id}`);
	};

	const handleReservationClick = (book) => {
		const reserveBook = async () => {
			const response = await fetch(
				"https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${savedToken}`,
					},
					body: JSON.stringify({
						bookId: book.id,
					}),
				}
			);
			if (response.ok) {
				alert(`You successfully reserved "${book.title}".`);
				await getBooks();
			} else {
				alert(`Failed to reserve "${book.title}".`);
			}
		};
		reserveBook(book);
	};

	const filteredBooks = books.filter((book) =>
		book.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
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
							<button onClick={() => handleDetailsClick(book)}>
								More Details
							</button>
							{book.available && savedToken && (
								<button onClick={() => handleReservationClick(book)}>
									Reserve Book
								</button>
							)}
						</div>
					))}
					{filteredBooks.length === 0 && <p>No books match your search.</p>}
				</div>
			</div>
		</>
	);
}

export default AllBooks;
