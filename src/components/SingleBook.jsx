import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleBook() {
    const [currentBook, setCurrentBook] = useState(null)

    const { id } = useParams();

    const availableMap = {
		false: "Not available to check out",
		true: "Available to check out",
	};
    
    useEffect(() => {
		const getBook = async () => {
			const res = await fetch(
				`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`
			);
			const data = await res.json();

			setCurrentBook(data);
		};
		getBook();
	}, []);

    if (!currentBook) return <p>Loading book...</p>

    return(
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
			</div>
		</>
    )
}

export default SingleBook