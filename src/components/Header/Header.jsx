import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Context } from "../../Context/Context";
import logo from "../../images/logo.svg";
import { Button } from "../Button/Button";
import { Cart } from "../Cart/Cart";
import Popup from "../Popup/Popup";
import styles from "./Header.module.css";

export const Header = () => {
	const { logged, setLogged, state } = useContext(Context);
	const [isShowUp, setIsShowPopup] = useState(false);
	const [fixed, setFixed] = useState(`${styles.top}`);

	const logout = () => {
		sessionStorage.removeItem("user");
		sessionStorage.removeItem("password");
		setLogged(false);
	};

	window.onscroll = function () {
		let scrollTop = window.pageYOffset
			? window.pageYOffset
			: document.documentElement.scrollTop
			? document.documentElement.scrollTop
			: document.body.scrollTop;
		if (scrollTop >= 400) {
			setFixed(`${styles.fixed}`);
		} else if (scrollTop <= 100) {
			setFixed(`${styles.top}`);
		}
	};

	// Cart reducers
	const total = state.cart.reduce((total, item) => {
		return total + item.price * item.quantity;
	}, 0);

	const totalItems = state.cart.reduce((total, item) => {
		return total + item.quantity;
	}, 0);

	return (
		<>
			<header className={styles.header}>
				<div className="wrapper">
					<div className={fixed}>
						<Link to="/">
							<img src={logo} alt="logo" />
						</Link>
						<div className={styles["button-box"]}>
							{logged ? (
								<Cart total={total} totalItems={totalItems} />
							) : (
								false
							)}

							{logged ? (
								<Button
									onClick={logout}
									type="button"
									className={styles.login}
								>
									Выйти{" "}
									<svg version="1.1" viewBox="0 0 16 16">
										<g>
											<path
												d="M11.5,0h-11c-0.276367,0 -0.5,0.223633 -0.5,0.5v1.5h1v-1h10v14h-10v-1h-1v1.5c0,0.276367 0.223633,0.5 0.5,0.5h11c0.276367,0 0.5,-0.223633 0.5,-0.5v-15c0,-0.276367 -0.223633,-0.5 -0.5,-0.5Z"
												transform="translate(3, 0)"
											></path>
											<path
												d="M4.93945,6l0.707031,0.707032l3.35352,-3.35352l-3.35352,-3.35352l-0.707031,0.707032l2.14649,2.14648h-7.08594v1h7.08594Z"
												transform="translate(1, 4.64648)"
											></path>
										</g>
									</svg>
								</Button>
							) : (
								<Button
									onClick={setIsShowPopup}
									type="button"
									className={styles.login}
								>
									Войти{" "}
									<svg version="1.1" viewBox="0 0 16 16">
										<g>
											<path
												d="M11.5,0h-11c-0.276367,0 -0.5,0.223633 -0.5,0.5v1.5h1v-1h10v14h-10v-1h-1v1.5c0,0.276367 0.223633,0.5 0.5,0.5h11c0.276367,0 0.5,-0.223633 0.5,-0.5v-15c0,-0.276367 -0.223633,-0.5 -0.5,-0.5Z"
												transform="translate(3, 0)"
											></path>
											<path
												d="M4.93945,6l0.707031,0.707032l3.35352,-3.35352l-3.35352,-3.35352l-0.707031,0.707032l2.14649,2.14648h-7.08594v1h7.08594Z"
												transform="translate(1, 4.64648)"
											></path>
										</g>
									</svg>
								</Button>
							)}
						</div>
					</div>
					<div className="bottom">
						<nav className={styles.nav}>
							<NavLink to="/about">О магазине</NavLink>
						</nav>
					</div>
				</div>
			</header>
			<Popup isShowUp={isShowUp} setIsShowPopup={setIsShowPopup} />
			<Outlet />
		</>
	);
};
