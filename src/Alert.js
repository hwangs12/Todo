import React, { useEffect } from "react";

const Alert = ({ type, msg, budList, showAlert }) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			showAlert();
		}, 2000);
		return () => clearTimeout(timeout);
	}, [budList, showAlert]);

	return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
