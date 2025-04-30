import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ setTokenState }) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			const response = await fetch(
				`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register`,
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						firstname: firstName,
						lastname: lastName,
						email: email,
						password: password,
					}),
				}
			);
			const result = await response.json();
			setTokenState(result.token);
			localStorage.setItem("token", result.token);
			navigate("/");
		} catch (error) {
			console.error("Something went wrong with registration!", error);
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="forms">
				<label>
					First Name
					<input
						name="firstName"
						onChange={(event) => setFirstName(event.target.value)}
						value={firstName}
					/>
				</label>
				<label>
					Last Name
					<input
						name="lastName"
						onChange={(event) => setLastName(event.target.value)}
						value={lastName}
					/>
				</label>
				<label>
					Email
					<input
						name="email"
						onChange={(event) => setEmail(event.target.value)}
						value={email}
						required
					/>
				</label>
				<label>
					Password
					<input
						name="password"
						onChange={(event) => setPassword(event.target.value)}
						value={password}
						minLength={6}
						required
					/>
				</label>
				<button>Register</button>
			</form>
		</>
	);
}

export default Register;
