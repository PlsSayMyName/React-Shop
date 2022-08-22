import styles from "./Input.module.css";

export const Input = (props) => {
	return (
		<div className={styles.input}>
			<label className={styles.label} htmlFor={props.id}>
				{props.name}
				<input className={styles.field} {...props} id={props.id} />
			</label>
			<p className={styles.error}>{props.error}</p>
		</div>
	);
};
