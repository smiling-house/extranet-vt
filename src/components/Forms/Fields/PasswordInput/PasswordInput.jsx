import React, { useState } from "react";
import eyeOn from '../../../../assets/icons/eye.png';
import eyeOff from '../../../../assets/icons/eye-slash.png';
import styles from "./PasswordInput.module.scss";
import DangerExclamation from "../../../Icons/DangerExlamation/DangerExclamation.jsx";

function PasswordInput({
	onSubmit,
	value,
	setValue,
	label,
	inputName,
	error,
	placeholder,
}) {
	const [showPwd, setShowPwd] = useState(false);

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			onSubmit(event);
		}
	};

	const style = (error && error.placement === 'password') ? { border: '1px solid #ff000f' } : {};

	return (
		<div className={styles.input_wrapper + " -fif_wrp"}>
			<div className={styles.label_wrapper + " -fif_label_wrp"}>
				<label htmlFor={inputName}>{label}</label>
			</div>

			<div className={"-fif_input_wrp"} style={{ position: 'relative' }}>

				<input
					onSubmit={onSubmit}
					onKeyPress={handleKeyDown}
					style={style}
					className={
						styles.input_field +
						" " +
						(error && error.placement === "password"
							? styles.invalid
							: styles.valid)
					}
					name={inputName}
					type={showPwd ? "text" : "password"}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={placeholder}
					id={inputName}
				/>
				{/*
					showPwd ?
						<span onClick={() => setShowPwd(!showPwd)} className={styles.show_pwd_btn + styles.hide} style={{ position: 'absolute', top: '16px', right: '20px' }}>
							<img src={eyeOff} />
						</span>
						:
						<span onClick={() => setShowPwd(!showPwd)} className={styles.show_pwd_btn} style={{ position: 'absolute', top: '20px', right: '20px' }}>
							<img src={eyeOn} />
						</span>
				*/}
			</div>

			{error && error.placement === "password" && <span className={"EmailInput_email_error__tfmZ1"}><DangerExclamation size={16} fill="red" />&nbsp;{error.msg}</span>}
		</div>
	);
}
export default PasswordInput;
