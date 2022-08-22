import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Context } from "../../Context/Context";
import logo from "../../images/logo.svg";
import { Button } from "../Button/Button";
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
								<Button type="button" className={styles.cart}>
									<svg
										id="Line"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 64 64"
									>
										<title>1</title>
										<path
											d="M31.92676,53.52637a3.74144,3.74144,0,0,0-7.48242.00011A3.74144,3.74144,0,0,0,31.92676,53.52637Zm-5.48242,0a1.74139,1.74139,0,0,1,3.48242.00007A1.74139,1.74139,0,0,1,26.44434,53.52637Z"
											id="id_110"
										></path>
										<path
											d="M52.44385,53.52637a3.7412,3.7412,0,0,0-7.48193.00011A3.7412,3.7412,0,0,0,52.44385,53.52637Zm-5.48194,0a1.74115,1.74115,0,0,1,3.48193.00007A1.74115,1.74115,0,0,1,46.96191,53.52637Z"
											id="id_111"
										></path>
										<path
											d="M56.80859,12.4126H18.41394a7.25786,7.25786,0,0,0-7.06385-5.67968H5a1,1,0,0,0,0,2h6.3501a5.23717,5.23717,0,0,1,5.04,3.83447L23.09448,39.131a4.43536,4.43536,0,0,0,1.74976,8.51648H54.44873a1.0002,1.0002,0,0,0-.00008-2H24.84424a2.44816,2.44816,0,0,1-.35059-4.87109l26.49317-3.83692c3.15478-.43994,5.78808-3.40771,6.55371-7.38427l2.37011-12.24952C60.37556,15.13329,59.1269,12.46149,56.80859,12.4126Zm1.13819,4.51465-2.37012,12.249c-.60352,3.13672-2.55908,5.46045-4.87158,5.7832L25.04254,38.67578,18.9187,14.4126H56.80029C57.87233,14.614,58.09891,15.919,57.94678,16.92725Z"
											id="id_112"
										></path>
									</svg>
									Корзина: {totalItems} товаров на общую сумму{" "}
									{total.toFixed(2)} $
								</Button>
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
