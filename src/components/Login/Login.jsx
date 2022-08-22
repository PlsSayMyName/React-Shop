import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import styles from "./Login.module.css";

const username = "user";
const password = "pass";

export const Form = (props) => {
	const [error, setError] = useState({});
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");
	const { setLogged } = useContext(Context);
	let navigate = useNavigate();
	let errors = {};
	const handleChangeLogin = (e) => {
		setUser(e.target.value.trim().replace(/ +/g, " "));
	};

	const handleChangePass = (e) => {
		setPass(e.target.value.trim().replace(/ +/g, " "));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (username !== user) {
			errors.user = "Неверное имя пользователя";
		}
		if (password !== pass) {
			errors.password = "Неверный пароль";
		}
		setError({ ...errors, errors: error });
		if (username === user && password === pass) {
			sessionStorage.setItem("user", username);
			sessionStorage.setItem("password", password);
			navigate("/");
			props.closePopup();
			setLogged(true);
		}
	};
	return (
		<form
			// method="POST"
			name="login-form"
			className={styles.form}
			onSubmit={handleSubmit}
		>
			<Input
				type="text"
				name="Логин"
				id="login"
				placeholder="Введите логин"
				onChange={handleChangeLogin}
				value={user}
				error={error.user}
				required
			/>
			<Input
				type="password"
				name="Пароль"
				id="password"
				autoComplete="off"
				placeholder="Введите пароль"
				onChange={handleChangePass}
				value={pass}
				error={error.password}
				required
			/>
			<div className={styles["button-box"]}>
				<Button className={styles.login} type="submit">
					Войти
				</Button>
				<Button
					onClick={props.closePopup}
					className={styles.cancel}
					type="button"
				>
					Отмена
				</Button>
			</div>
		</form>
	);
};
