import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AllBooks({ setBook, searchTerm, setSearchTerm }) {
	const [books, setBooks] = useState([]);
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
			<div>
				<input
					type="text"
					placeholder="Search book titles..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					style={{ marginLeft: "1rem", flexGrow: 1, maxWidth: "300px" }}
				/>
				<h2 className="title">Catalog:</h2>
				<div className="bookslist">
					{filteredBooks.map((book) => (
						<div key={book.id}>
							<h3>{book.title}</h3>
							<img src={book?.coverimage} className="bookcover" />
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
