import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

export const Footer = () => {
	return (
		<>
			<footer>
				345
				<nav>
					<Link to="/">
						<img src={logo} alt="logo" />
					</Link>
					<Link to="/about">About</Link>
				</nav>
			</footer>
		</>
	);
};
