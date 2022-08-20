import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../api/getSingleProduct";
import blank from "../../images/no-image.jpg";
import { Button } from "../Button/Button";
import styles from "./ProductInner.module.css";

export const ProductInner = () => {
	const { id } = useParams();
	const [product, setProduct] = useState([]);
	const url = `https://api.escuelajs.co/api/v1/products/${id}`;

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
	// console.log(product.images[0]);
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
						) : product.images ? (
							<img
								className={styles.img}
								src={
									product.images[0]
										? product.images[0]
										: blank
								}
								alt={product.title}
							/>
						) : (
							false
						)}
					</div>
					<div className="right">
						<p className={styles.description}>
							{product.description}
						</p>
						<p className={styles.price}>{product.price} $</p>
						<p className={styles["amount-title"]}>Количество:</p>
						<div className={styles.amount}>
							<Button type="button" className={styles.minus}>
								-
							</Button>
							<input
								type="text"
								className={styles.input}
								name="sum"
								value="1"
								readOnly
							/>
							<Button type="button" className={styles.plus}>
								+
							</Button>
						</div>
						<Button type="button" className={styles["add-cart"]}>
							Добавить в корзину
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
};
