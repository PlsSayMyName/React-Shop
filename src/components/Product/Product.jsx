import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { getProducts } from "../../api/getProducts";
import blank from "../../images/no-image.jpg";
import styles from "./Product.module.css";
import { Context } from "../../Context/Context";

export const Product = () => {
	const [products, setProducts] = useState([]);
	let { logged, dispatch } = useContext(Context);

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

	const addToCart = (product) => {
		dispatch({ type: "ADD_TO_CART", payload: product });
	};

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
						<p className={styles.price}>
							{product.price.toFixed(2)} $
						</p>
						{logged ? (
							<Button
								type="button"
								className={styles["add-cart"]}
								onClick={() => addToCart(product)}
							>
								Добавить в корзину
							</Button>
						) : (
							<p>Чтобы добавить товар в корзину, залогинитесь!</p>
						)}
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
