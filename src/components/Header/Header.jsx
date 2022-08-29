import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../images/logo.svg";
import { Button } from "../Button/Button";
import { Cart } from "../Cart/Cart";
import Popup from "../Popup/Popup";
import { ReactComponent as LoginIcon } from "../../images/login.svg";
import { ReactComponent as LogoutIcon } from "../../images/logout.svg";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userReducer";

export const Header = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const logged = user.isLogIn;
	const [isShowUp, setIsShowPopup] = useState(false);

	const logout = () => {
		dispatch(login(false));
	};

	return (
		<>
			<header className={styles.header}>
				<div className="wrapper">
					<div className={styles.fixed}>
						<Link to="/">
							<img src={logo} alt="logo" />
						</Link>
						<div className={styles["button-box"]}>
							{logged ? <Cart /> : null}
							{logged ? (
								<Button
									onClick={logout}
									type="button"
									className={styles.login}
								>
									Выйти <LogoutIcon />
								</Button>
							) : (
								<Button
									onClick={setIsShowPopup}
									type="button"
									className={styles.login}
								>
									Войти <LoginIcon />
								</Button>
							)}
						</div>
					</div>
					<div className={styles.bottom}>
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
