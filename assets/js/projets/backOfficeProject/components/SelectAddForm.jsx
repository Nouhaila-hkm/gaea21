import React, { useRef } from "react";
import axios from "axios";

const SelectAddForm = (props) => {
	const handleSubmitAddForm = (event) => {
		event.preventDefault();
		const selectedform = event.target.elements.FormSelect.value;

		const validation = confirm(
			"Etes-vous sûr de vouloir associer ce formulaire avec ce projet ?"
		);

		if (validation) {
			const data = { formId: selectedform, projectId: props.projectId };

			axios
				.post("/backoffice/add/form", data)
				.then((response) => {
					console.log(response);
					location.reload();
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<React.Fragment>
			<form onSubmit={handleSubmitAddForm}>
				<select className="form-select mt-2" name="FormSelect" id="FormSelect">
					{props.formList.map((form) => {
						return (
							<option key={form.id} value={form.id}>
								{form.formName}
							</option>
						);
					})}
				</select>
				<button type="submit" className="btn btn-success">
					Valider
				</button>
			</form>
		</React.Fragment>
	);
};

export default SelectAddForm;
