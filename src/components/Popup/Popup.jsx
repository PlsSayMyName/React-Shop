import ReactDom from "react-dom";
import { Button } from "../Button/Button";
import styles from "./Popup.module.css";
import { Form } from "../Login/Login";

const Template = ({ closePopup }) => {
	return (
		<div onClick={closePopup} className={styles["window-background"]}>
			<div
				onClick={(e) => {
					e.stopPropagation();
				}}
				className={styles["window-body"]}
			>
				<div className={styles["window-title"]}>
					<h2 className={styles.title}>Авторизация</h2>
					<Button
						type="button"
						onClick={closePopup}
						className={styles.close}
					></Button>
				</div>
				<div className="window-content">
					<Form closePopup={closePopup} />
				</div>
			</div>
		</div>
	);
};

const Popup = ({ isShowUp, setIsShowPopup }) => {
	const closePopup = () => {
		setIsShowPopup(false);
	};
	const domNode = document.getElementById("popup");
	if (domNode && isShowUp) {
		return ReactDom.createPortal(
			<Template closePopup={closePopup} />,
			domNode
		);
	}
};

export default Popup;
