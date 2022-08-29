import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { Button } from "../Button/Button";
import styles from "./Total.module.css";

export const Total = () => {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const getTotal = () => {
		let totalQuantity = 0;
		let totalPrice = 0;
		cart.cart.forEach((item) => {
			totalQuantity += item.quantity;
			totalPrice += item.price * item.quantity;
		});
		return { totalPrice, totalQuantity };
	};

	return (
		<div className={styles.total}>
			<h2>Итого:</h2>
			<div className={styles.sum}>
				<p>
					Всего <span>({getTotal().totalQuantity})</span> на сумму{" "}
					{""}
					<strong>{getTotal().totalPrice.toFixed(2)} $</strong>
				</p>
				{cart.cart.length > 0 ? (
					<Button
						className={styles.clear}
						onClick={() => dispatch(clearCart())}
					>
						Очистить корзину
					</Button>
				) : null}
			</div>
		</div>
	);
};
