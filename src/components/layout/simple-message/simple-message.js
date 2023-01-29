import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const SimpleMessage = ({ messageToShow, onCloseClick }) => {
	const [message, setMessage] = useState({
		title: "",
		description: "",
		variant: "",
	});

	return (
		<>
			<Alert
				show={messageToShow && messageToShow.show}
				variant={messageToShow.variant}
			>
				<Alert.Heading>
					{messageToShow && messageToShow.title}
				</Alert.Heading>
				<p>{messageToShow && messageToShow.description}</p>
				<hr />
				<div className="d-flex justify-content-end">
					<Button
						onClick={() => {
							onCloseClick();
						}}
					>
						Fechar
					</Button>
				</div>
			</Alert>
		</>
	);
};

export default SimpleMessage;
