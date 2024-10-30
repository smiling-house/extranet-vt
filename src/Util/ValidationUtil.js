export const PWD_RULES = [
	{
		title: "One lowercase character",
		regexp: /[a-z]/,
	},
	// {
	//   title: "One uppercase character",
	//   regexp: /[A-Z]/,
	// },
	{
		title: "One number",
		regexp: /[0-9]/,
	},
	// {
	//   title: "One special character",
	//   regexp: /[\|\$"\[\*@!`_#\%\?<\.,\-\=;:\\>\/&\(\)’\^~{}\]\+]+/,
	// },
	{
		title: "8 characters minimum",
		regexp: /.{8}/,
	},
];

export const validateEmail = (email) => {
	return /^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,10}$/.test(email);
};

export const nameValid = (name) => {
	if (name === undefined) {
		return false;
	}
	return (
		name.length > 0 &&
		!nameLooksLikeEmail(name) &&
		/^([a-zA-Z\u00C0-\u024F\u1E00-\u1EFF -]*)$/.test(name)
	);
};

export const nameLooksLikeEmail = (name) => {
	if (name === undefined) {
		return false;
	}
	return name.includes("@");
};
