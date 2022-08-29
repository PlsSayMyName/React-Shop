import { useDispatch } from "react-redux";
import {
	decrementQuantity,
	incrementQuantity,
	removeItem,
} from "../../redux/cartSlice";
import { Button } from "../Button/Button";
import styles from "./CartItem.module.css";

function CartItem({ id, title, price, quantity = 0 }) {
	const dispatch = useDispatch();

	return (
		<tr className={styles.item}>
			<td>{id}</td>
			<td>{title}</td>
			<td>{price} $</td>
			<td className={styles.amount}>
				<Button
					className={styles.minus}
					onClick={() => dispatch(decrementQuantity(id))}
				>
					-
				</Button>
				<p>{quantity}</p>
				<Button
					className={styles.plus}
					onClick={() => dispatch(incrementQuantity(id))}
				>
					+
				</Button>
			</td>
			<td>
				<Button
					className={styles.remove}
					onClick={() => dispatch(removeItem(id))}
				>
					Удалить
				</Button>
			</td>
		</tr>
	);
}

export default CartItem;
