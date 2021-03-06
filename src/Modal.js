import React, { useRef, useEffect, useCallback } from "react";
import { Button } from "@mui/material";
import "./Modal.css";

const Modal = ({ modalStatus, setModalStatus, navigate }) => {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      // setModalStatus(false);
      console.log("closemodal");
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && modalStatus) {
        // setModalStatus(false);
        console.log("closemodal key");
      }
    },
    [modalStatus, setModalStatus]
  );

  const handleButton = () => {
    navigate("/");
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <div
      className="modal"
      style={{ display: `${modalStatus ? "flex" : "none"}` }}
      ref={modalRef}
      onClick={closeModal}
    >
      <div className="modalContentContainer">
        <h1>You are not logged in yet</h1>
        <Button variant="contained" fullWidth={true} onClick={handleButton}>
          Proceed to log in
        </Button>
      </div>
    </div>
  );
};

export default Modal;
