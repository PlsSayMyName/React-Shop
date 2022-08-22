import React from "react";
import { Link } from "react-router-dom";
import notFoundImg from "../../images/404.jpg";
import styles from "./NotFound.module.css";

export const NotFound = () => {
	return (
		<main>
			<section className="wrapper">
				<div className={styles.item}>
					<div className="left">
						<h1 className={styles.title}>Ошибка 404</h1>
						<p className={styles.text}>
							Страница, которую вы ищете, не существует.
						</p>
						<Link className={styles.link} to="/">
							Вернуться на главную
						</Link>
					</div>
					<div className={styles.right}>
						<img src={notFoundImg} alt="not found page" />
					</div>
				</div>
			</section>
		</main>
	);
};
