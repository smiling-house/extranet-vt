import React from "react";
import styles from "./DropdownInput.module.scss";
import { nameLooksLikeEmail, nameValid } from "../../../../Util/ValidationUtil";

function DropdownInput({
	                       onSubmit,
	                       value,
	                       setValue,
	                       label,
	                       inputName,
	                       placeholder,
	                       error,
	                       dropDownObj,
                       }) {
	return (
		<div className={styles.input_wrapper + " -fif_wrp"}>
			<div className={styles.label_wrapper + " -fif_label_wrp"}>
				<label htmlFor={inputName}>{label}</label>
			</div>
			<div
				className={
					styles.input_field_wrapper +
					" -fif_input_wrp " +
					(error !== undefined ? styles.error : ``)
				}
			>
				<select
					style={{padding: '18px'}}
					className={styles.input_field}
					name={label}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					id={label + "id"}
				>
					<option>{placeholder}</option>
					{dropDownObj.map((item, i) => (
						<option key={i + 1} value={item.value?item.value:item.name}>
							{item.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
export default DropdownInput;
