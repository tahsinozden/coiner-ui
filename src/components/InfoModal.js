import React from 'react'
import Modal from "react-bootstrap/es/Modal";

const InfoModal = (props) => {
    return (
        <Modal
            size="sm"
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="modal-sizes-title-sm">
            <Modal.Header closeButton>
                <Modal.Title id="modal-sizes-title-sm">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.message}</Modal.Body>
        </Modal>
    );
};

export default InfoModal;