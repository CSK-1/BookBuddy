import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Account({ token, setTokenState }) {
	const [myBooks, setMyBooks] = useState();
	const [myName, setMyName] = useState("");
	const [myReservations, setMyReservations] = useState([]);
	const navigate = useNavigate();

	const savedToken = localStorage.getItem("token");

	useEffect(() => {
		const getMyName = async () => {
			const res = await fetch(
				"https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
				{
					headers: {
						Authorization: `Bearer ${savedToken}`,
					},
				}
			);
			const userData = await res.json();

			setMyName(userData.firstname);
		};
		getMyName();
	}, []);

	useEffect(() => {
		const getMyReservations = async () => {
			const res = await fetch(
				"https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
				{
					headers: {
						Authorization: `Bearer ${savedToken}`,
					},
				}
			);
			const reservationData = await res.json();

			setMyReservations(reservationData);
		};
		getMyReservations();
	}, []);

	function handleClick() {
		localStorage.removeItem("token");
		setTokenState(null);
		navigate("/");
	}

	return (
		<div>
			<h4>Welcome back{myName ? `, ${myName}` : ""}!</h4>
			<p>
				{myReservations.length > 0
					? `Here are your current book reservations:`
					: "You do not have any book reservations at this time."}
			</p>
			<button onClick={handleClick}>Log Out</button>
		</div>
	);
}

export default Account;
