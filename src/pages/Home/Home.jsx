import React from "react";
import { Product } from "../../components/Product/Product";
import styles from "./Home.module.css";

export const Home = () => {
	return (
		<main>
			<section className="products wrapper">
				<h1 className={styles.title}>Каталог товаров</h1>
				<div className={styles["product-grid"]}>
					<Product />
				</div>
			</section>
		</main>
	);
};
