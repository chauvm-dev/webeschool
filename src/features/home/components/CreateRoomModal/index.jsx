import classes from "./index.module.css";
import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
const CreateRoomModal = ({
  show,
  onHide,
  handleImageChange,
  selectedFiles,
}) => {
  return (
    <Modal
      size="lg"
      animation={false}
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={classes.CreateRoomheader}>
        <Modal.Title id="contained-modal-title-vcenter">
          Room
          <div className={"d-flex justify-content-between align-items-center"}>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onHide}
            />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <div className="file-loading mb-3 position-relative">
            <div
              className={[
                "rounded-circle mx-auto d-block p-0",
                classes.image_preview,
              ].join(" ")}
            >
              <img
                src={
                  selectedFiles
                    ? selectedFiles
                    : "https://www.chanchao.com.tw/vietnamwood/images/default.jpg"
                }
                alt="..."
                className={["rounded-circle mx-auto d-block"].join(" ")}
              />
            </div>
            <input
              className={[
                "form-control rounded-circle mx-auto",
                classes.form_preview,
              ].join(" ")}
              accept="image/*"
              type="file"
              id="formFile"
              onChange={handleImageChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Name
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Name of room"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className={classes.ButtonCancel} onClick={onHide}>
          Close
        </Button>
        <Button className={classes.ButtonSuccess} onClick={onHide}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateRoomModal;
