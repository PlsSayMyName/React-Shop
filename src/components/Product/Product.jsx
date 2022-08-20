import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { getProducts } from "../../api/getProducts";
import blank from "../../images/no-image.jpg";
import styles from "./Product.module.css";

export const Product = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		let mounted = true;
		try {
			getProducts().then((items) => {
				if (mounted) {
					setProducts(items);
				}
			});
		} catch (error) {
			console.log(error);
		}
		return () => (mounted = false);
	}, []);
	console.log(products);
	return (
		<>
			{products.map((product) => (
				<div className={styles.card} key={product.id}>
					<div className={styles.left}>
						<div className={styles["img-box"]}>
							<Link
								className={styles["main-img-link"]}
								to={`/products/${product.id}`}
							>
								<img
									className={styles["main-img"]}
									src={
										product.images[0]
											? product.images[0]
											: blank
									}
									alt={product.title}
								/>
							</Link>
						</div>
						<h2 className={styles["card-title"]}>
							<Link
								className={styles["link"]}
								to={`/products/${product.id}`}
							>
								{product.title}
							</Link>
						</h2>
						<p className={styles.price}>{product.price} $</p>
						<Button type="button" className={styles["add-cart"]}>
							Добавить в корзину
						</Button>
					</div>
					<div className={styles["right"]}>
						{product.images[0] ? (
							<Link
								className={styles["link"]}
								to={`/products/${product.id}`}
							>
								<img
									className={styles["img"]}
									src={
										product.images[0]
											? product.images[0]
											: blank
									}
									alt={product.title}
								/>
							</Link>
						) : (
							false
						)}
						{product.images[1] ? (
							<Link
								className={styles["link"]}
								to={`/products/${product.id}`}
							>
								<img
									className={styles["img"]}
									src={
										product.images[1]
											? product.images[1]
											: blank
									}
									alt={product.title}
								/>
							</Link>
						) : (
							false
						)}
						{product.images[2] ? (
							<Link
								className={styles["link"]}
								to={`/products/${product.id}`}
							>
								<img
									className={styles["img"]}
									src={
										product.images[2]
											? product.images[2]
											: blank
									}
									alt={product.title}
								/>
							</Link>
						) : (
							false
						)}
					</div>
				</div>
			))}
		</>
	);
};
