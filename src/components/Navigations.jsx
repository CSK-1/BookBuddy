import { Link } from "react-router-dom";

function Navigations({ token }) {
	return (
		<nav>
			<Link to="/">Home</Link>
			{token ? <Link to="/account">Account</Link> : <Link to="/login">Log In</Link>}
		</nav>
	);
}

export default Navigations;