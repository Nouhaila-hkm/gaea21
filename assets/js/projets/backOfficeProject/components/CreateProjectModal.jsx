import React from "react";
import axios from "axios";

const CreateProjectModal = (props) => {
	const handleSubmitCreateProject = (e) => {
		e.preventDefault();

		const data = {
			projectName: e.target.elements.project_name.value,
			projectUrl: e.target.elements.project_url.value,
		};

		axios
			.post("/backoffice/create/project", data)
			.then((response) => {
				props.handleCloseModal();
				location.reload();
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="modal-form">
			<div className="modal-main">
				{/* Ajouter la fonction ci dessous dans le parent */}
				<button
					onClick={props.handleCloseModal}
					className="btn btn-danger close-btn"
				>
					X
				</button>
				<div className="modal-content">
					<h1>Création de projet</h1>
					<form action="" onSubmit={handleSubmitCreateProject}>
						<div className="form-group">
							<label htmlFor="project_name">Nom du projet :</label>
							<input
								type="text"
								id="project_name"
								className="form-control"
								placeholder="Nom du projet"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="project_url">URL du projet :</label>
							<input
								type="text"
								id="project_url"
								className="form-control"
								placeholder="URL du projet"
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							{" "}
							Valider{" "}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateProjectModal;
