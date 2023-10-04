import React, { useRef } from "react";
import axios from "axios";

const SelectAddAnnounce = (props) => {
	const handleSubmitAnnounceForm = (event) => {
		event.preventDefault();
		const selectedAnnounce = event.target.elements.FormSelect.value;

		const validation = confirm(
			"Etes-vous sûr de vouloir associer cette annonce avec ce projet ?"
		);

		if (validation) {
			const data = { announceId: selectedAnnounce, projectId: props.projectId };

			axios
				.post("/backoffice/add/announce", data)
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
			<form onSubmit={handleSubmitAnnounceForm}>
				<select className="form-select mt-2" name="FormSelect" id="FormSelect">
					{props.announceList.map((announce) => {
						return (
							<option key={announce.id} value={announce.id}>
								{announce.title}
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

export default SelectAddAnnounce;
