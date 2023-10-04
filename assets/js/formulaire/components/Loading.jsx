import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <div className="row text-center pt-5">
      <Spinner
        className="m-auto"
        animation="border"
        style={{ width: "10rem", height: "10rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
