import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../../components/Button/Button";
import CartItem from "../../components/CartItem/CartItem";
import { Total } from "../../components/Total/Total";
import styles from "./Cart.module.css";

export const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.user);
	const logged = user.isLogIn;
	return (
		<main>
			<section className="cart wrapper">
				<h1>Корзина</h1>
				{cart.cart.length > 0 && logged ? (
					<>
						<table className={styles.table}>
							<thead>
								<tr>
									<th>ID</th>
									<th>Имя</th>
									<th>Цена</th>
									<th>Количество</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{cart.cart.map((item) => (
									<CartItem
										key={item.id}
										id={item.id}
										title={item.title}
										price={item.price}
										quantity={item.quantity}
									/>
								))}
							</tbody>
						</table>
						<Total />
						<Button className={styles.pay} disabled>
							Оплатить
						</Button>
					</>
				) : (
					<h2>Корзина пуста.</h2>
				)}
			</section>
		</main>
	);
};
