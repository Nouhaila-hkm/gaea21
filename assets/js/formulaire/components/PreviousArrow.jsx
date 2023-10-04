import React from "react";
export default function PreviousArrow() {
  return (
    <>
      <button className="mt-4 previousButton" onClick={() => history.back()}>
        <span className="me-2">&#60;</span>Précédent
      </button>
    </>
  );
}
