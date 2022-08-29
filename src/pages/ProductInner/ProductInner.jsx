import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../api/getSingleProduct";
import blank from "../../images/no-image.jpg";
import { Button } from "../../components/Button/Button";
import styles from "./ProductInner.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

export const ProductInner = () => {
	const { id } = useParams();
	const user = useSelector((state) => state.user);
	const logged = user.isLogIn;
	const dispatch = useDispatch();
	const [product, setProduct] = useState([]);
	const url = `https://fakestoreapi.com/products/${id}`;

	useEffect(() => {
		let mounted = true;
		try {
			getSingleProduct(url).then((items) => {
				if (mounted) {
					setProduct(items);
				}
			});
		} catch (error) {
			console.log(error);
		}
		return () => (mounted = false);
	}, [url]);

	return (
		<main>
			<section className="wrapper product-inner">
				<h1>{product.title}</h1>
				<div className={styles.content}>
					<div className={styles.left}>
						{product.image ? (
							<img
								className={styles.img}
								alt={product.title}
								src={product.image ? product.image : blank}
							/>
						) : null}
					</div>
					<div className="right">
						<p className={styles.description}>
							{product.description}
						</p>
						<p className={styles.price}>
							{product.price?.toFixed(2)} $
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
			</section>
		</main>
	);
};
