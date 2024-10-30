import React from "react";
import styles from "./TermsFooter.module.scss";

function TermsFooter({ className = "", isMobile }) {
	return (
		<div className={styles.terms_footer + " " + className} >
		<h5>© {new Date().getFullYear()}{" "}
			<span className="custom-link">
				VillaTracker
			</span>
			.{isMobile ? <br /> : null} All rights reserved.{" "}
			<span className="custom-link">
				Cookie policy
			</span>
			,{" "}
			<span className="custom-link">
				Privacy
			</span>{" "}
			and{" "}
			<span className="custom-link">
				Terms
			</span>
			.</h5>
		</div>
	);
}
export default TermsFooter;
