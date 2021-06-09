import classes from "./index.module.css";
import React from "react";
import { Alert, Col, Container, Modal, Row } from "react-bootstrap";

const EditRoomModal = ({ show, onHide, selectedFiles, handleImageChange }) => {
  return (
    <Modal
      animation={false}
      show={show}
      onHide={onHide}
      centered
      size={"xl"}
      className={[classes.modal_container].join(" ")}
    >
      <Modal.Header>
        <Modal.Title className={"d-flex justify-content-between w-100"}>
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
      <Modal.Body className={classes.modal_body}>
        <Container>
          <Row>
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
          </Row>
          <Row>
            <Col sm={3}>Name</Col>
            <Col sm={9}>
              <Alert variant={"success"}>
                This is a {"success"} alert—check it out!
              </Alert>{" "}
            </Col>
          </Row>
          <Row>
            <Col sm={3}>Type</Col>
            <Col sm={9}>
              <Alert variant={"success"}>
                This is a {"success"} alert—check it out!
              </Alert>{" "}
            </Col>
          </Row>
          <Row>
            <Col sm={3}>Members</Col>
            <Col sm={9}>
              <Alert variant={"secondary"}>
                This is a {"secondary"} alert—check it out!
              </Alert>{" "}
              <Alert variant={"secondary"}>
                This is a {"secondary"} alert—check it out!
              </Alert>{" "}
              <Alert variant={"secondary"}>
                This is a {"secondary"} alert—check it out!
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>Request</Col>
            <Col sm={9}>
              <Alert variant={"secondary"}>
                This is a {"secondary"} alert—check it out!
              </Alert>{" "}
              <Alert variant={"secondary"}>
                This is a {"secondary"} alert—check it out!
              </Alert>{" "}
              <Alert variant={"secondary"}>
                This is a {"secondary"} alert—check it out!
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>Ban</Col>
            <Col sm={9}>
              <Alert variant={"secondary"}>
                This is a {"secondary"} alert—check it out!
              </Alert>{" "}
              <Alert variant={"secondary"}>
                This is a {"secondary"} alert—check it out!
              </Alert>{" "}
              <Alert variant={"secondary"}>
                This is a {"secondary"} alert—check it out!
              </Alert>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditRoomModal;
