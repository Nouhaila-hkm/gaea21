import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function OptionGroup(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    if (confirm("Mettre à jour l'option group?")) {
    }
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return <></>;
}
