import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const ConfirmationMessage = ({ confirmationMessage, onCloseClick }) => {
	const onYesButtonClick = () => {
		console.log("CONFIRMATION", confirmationMessage);
		confirmationMessage.onYesClick();
	};

	const onNoButtonClick = () => {
		confirmationMessage.onNoClick();
	};

	return (
		<div
			className="modal show"
			style={{ display: "block", position: "initial" }}
		>
			<Modal
				show={confirmationMessage.show}
				onHide={() => onCloseClick()}
			>
				<Modal.Header closeButton>
					<Modal.Title>{confirmationMessage.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>{confirmationMessage.description}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => onNoButtonClick()}
					>
						Não
					</Button>
					<Button
						variant="primary"
						onClick={() => onYesButtonClick()}
					>
						Sim
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ConfirmationMessage;
