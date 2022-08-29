import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ReactComponent as CartIcon } from "../../images/cart.svg";
import styles from "./Cart.module.css";

export const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const getTotalQuantity = () => {
		let total = 0;
		cart.cart.forEach((item) => {
			total += item.quantity;
		});
		return total;
	};
	return (
		<NavLink to="/cart" className={styles.cart}>
			<CartIcon />
			<span>{getTotalQuantity() || 0}</span>
			Корзина
		</NavLink>
	);
};
