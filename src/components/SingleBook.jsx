import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleBook() {
	const [currentBook, setCurrentBook] = useState(null);
	const [message, setMessage] = useState("");

	const { id } = useParams();

	const savedToken = localStorage.getItem("token");

	const availableMap = {
		false: "Not available to check out",
		true: "Available to check out",
	};

	const getBook = async () => {
		const res = await fetch(
			`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`
		);
		const data = await res.json();

		setCurrentBook(data);
	};

	useEffect(() => {
		getBook();
	}, [id]);

	const handleReservationClick = async (book) => {
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
			await getBook();
		} else {
			alert(`Failed to reserve "${book.title}".`);
		}
	};

	if (!currentBook) return <p>Loading book...</p>;

	return (
		<>
			<div className="bookslist">
				<h3>{currentBook.title}</h3>
				<img
					src={currentBook.coverimage}
					alt={currentBook.titlee}
					style={{ height: "400px" }}
				/>
				<p>By {currentBook.author}</p>
				<p>Description: {currentBook.description}</p>
				<p>Status: {availableMap[currentBook.available] || "Other"}</p>
				{currentBook.available && savedToken && (
					<button onClick={() => handleReservationClick(currentBook)}>
						Reserve Book
					</button>
				)}
			</div>
		</>
	);
}

export default SingleBook;
