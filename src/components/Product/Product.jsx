import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { getProducts } from "../../api/getProducts";
import blank from "../../images/no-image.jpg";
import styles from "./Product.module.css";
import { addToCart } from "../../redux/cartSlice";

export const Product = () => {
	const [products, setProducts] = useState([]);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const logged = user.isLogIn;

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
									src={product.image ? product.image : blank}
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
								onClick={() => dispatch(addToCart(product))}
							>
								Добавить в корзину
							</Button>
						) : (
							<p>Чтобы добавить товар в корзину, залогинитесь!</p>
						)}
					</div>
				</div>
			))}
		</>
	);
};
