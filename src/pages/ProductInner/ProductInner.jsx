import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../api/getSingleProduct";
import { Context } from "../../Context/Context";
import blank from "../../images/no-image.jpg";
import { Button } from "../../components/Button/Button";
import styles from "./ProductInner.module.css";

export const ProductInner = () => {
	const { id } = useParams();
	const { logged, dispatch } = useContext(Context);
	const [product, setProduct] = useState([]);
	const url = `https://api.escuelajs.co/api/v1/products/${id}`;
	const [value, setValue] = useState(0);

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

	// в карточке товара присутствует баг: он заключается в том, что если я добавляю в корзину товар с главной страницы, то счетчик input со значением value здесь всегда по умолчанию 0. Я не совсем понимаю, как связать его с редьюсером так, чтобы когда я выставляю нужное количество товара, перехожу на другой товар а затем возвращаюсь, чтобы количество было ровно таким, каким и должно быть. Ниже я сделал небольшой костыль для более-менее нормального отображения счетчика, но все же :)

	const addToCartBtn = (product) => {
		dispatch({ type: "ADD_TO_CART", payload: product });
	};
	const addToCart = (product) => {
		dispatch({ type: "ADD_TO_CART", payload: product });
		setValue(value + 1);
	};
	const delItemCart = (product) => {
		dispatch({ type: "DEL_ITEM", payload: product });
	};
	const incrementQty = () => {
		setValue(value + 1);
	};
	const decrementQty = () => {
		if (value <= 0) {
			return;
		}
		setValue(value - 1);
	};
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
						<p className={styles.price}>
							{product.price?.toFixed(2)} $
						</p>
						{logged ? (
							<>
								<p className={styles["amount-title"]}>
									Количество:
								</p>
								<div className={styles.amount}>
									<Button
										onClick={() => {
											delItemCart(product);
											decrementQty();
										}}
										type="button"
										className={styles.minus}
									>
										-
									</Button>
									<input
										type="text"
										className={styles.input}
										name="sum"
										value={value}
										readOnly
									/>
									<Button
										onClick={() => {
											addToCart(product);
											incrementQty();
										}}
										type="button"
										className={styles.plus}
									>
										+
									</Button>
								</div>
								<Button
									type="button"
									className={styles["add-cart"]}
									onClick={() => {
										addToCartBtn(product);
										setValue(value + 1);
									}}
								>
									Добавить в корзину
								</Button>
							</>
						) : (
							<p>Чтобы добавить товар в корзину, залогинитесь!</p>
						)}
					</div>
				</div>
			</section>
		</main>
	);
};
