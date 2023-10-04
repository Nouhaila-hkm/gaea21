import React from "react";

export default function Response(props) {
  const formData = props.formData;
  return (
    <div className="form-response">
      <div className="alert alert-success m-auto">
        Votre formulaire à été enregistré !
      </div>
      <div className="row mt-3">
        {formData.map((answer, index) => (
          <div
            key={index}
            className={
              answer.field.size == 1
                ? "form-response-group col-6"
                : "form-response-group col-12"
            }
          >
            <label className="form-label true">{answer.field.label}</label>
            {answer.answer != "" ? (
              <div className="form-control answer">{answer.answer}</div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// function Input() {
//   switch (fieldType.typeName) {
//   }
// }

// function FormData() {
//   return (
//     <>
//       <div className={fieldSizeBool}>
//         <div className={fieldErrorDiv}>
//           {field.show_label ? (
//             <label htmlFor={field.label} className="form-label">
//               {field.label}
//               {field.is_required && <span className="text-danger ms-2">*</span>}
//             </label>
//           ) : (
//             <></>
//           )}
//           {Input()}
//           <ErrorMessage />
//         </div>
//       </div>
//     </>
//   );
// }
