import React from "react";
import Button from "../../../components/Buttons/Button/Button";
import deleteTitleIcon from '../../../assets/icons/admin/delete-title-icon.svg';

import './DeleteAgency.scss';

const DeleteAgency = props => {
	const { agency, onClose } = props;

	return (
		<div className="delete-agency-container">

			<div className="delete-agency-header">
				<img src={deleteTitleIcon} alt="" />
				<div className="delete-agency-title">Delete Agency</div>
			</div>

			<div className="delete-agency-main">
				Are you sure you want to delete this relation?
			</div>

			<div className="delete-agency-footer">
				<Button
					style={{fontSize: '18px', marginRight: '30px'}}
					variant="link"
					text="Cancel"
					onClick={onClose}
				/>
				<Button
					style={{fontSize: '18px'}}
					text="Delete Agency"
					onClick={onClose}
				/>
			</div>
		</div>
	)
};

export default DeleteAgency;