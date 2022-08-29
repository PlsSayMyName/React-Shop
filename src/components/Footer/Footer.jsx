import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import styles from "./Footer.module.css";

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className="wrapper">
				<nav className={styles.nav}>
					<Link to="/">
						<img className={styles.logo} src={logo} alt="logo" />
					</Link>
					<Link to="/about">О магазине</Link>
				</nav>
			</div>
		</footer>
	);
};
