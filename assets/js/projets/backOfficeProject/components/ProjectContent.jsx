import React, { useEffect, useState } from "react";
import arrow from "../../../../images/back_office/projets/Groupe 2248.svg";
import axios from "axios";
import SelectAddForm from "./SelectAddForm";
import SelectAddAnnounce from "./SelectAddAnnounce";

const ProjectContent = (props) => {
	const [isSelected, setIsSelected] = useState(false);
	const [addFormTriggered, setAddFormTriggered] = useState(false);
	const [addAnnounceTriggered, setAddAnnounceTriggered] = useState(false);

	const project = props.project;
	const announceList = props.announceList;
	const formList = props.formList;

	const getFormsFiltered = () => {
		const formsToRemove = project.form;
		console.log(project);
		if (project.form.length === 0) {
			return formList;
		} else {
			const filteredForm = formList.filter(
				(form) => !formsToRemove.some((obj) => obj.id === form.id)
			);
			return filteredForm;
		}
	};

	const getAnnouncesFiltered = () => {
		//On retire les annonces déjà présentes dans le projet
		const announcesToRemove = project.announces;
		if (
			project.announces === null ||
			project.announces.length === 0 ||
			announcesToRemove === null
		) {
			return announceList;
		} else {
			const filteredAnnounce = announceList.filter(
				(announce) => !announcesToRemove.some((obj) => obj.id === announce.id)
			);
			return filteredAnnounce;
		}
	};

	const handleClickItem = () => {
		setIsSelected(!isSelected);
	};

	const handleAddFormButton = (event) => {
		event.preventDefault();
		setAddFormTriggered(!addFormTriggered);
	};

	const handleAddAnnounceButton = (event) => {
		event.preventDefault();
		setAddAnnounceTriggered(!addAnnounceTriggered);
	};

	const handleRemoveForm = (event, formId) => {
		event.preventDefault();

		const confirmation = confirm(
			"Etes vous sûr de vouloir retirer l'association de ce formulaire ?"
		);

		if (confirmation) {
			const data = { projectId: project.id, formId: formId };
			axios
				.post("/backoffice/remove/form", data)
				.then((response) => {
					location.reload();
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const removeProjectHandler = (event) => {
		event.preventDefault();

		const confirmation = confirm(
			"Etes vous sûr de vouloir supprimer ce projet ?"
		);

		if (confirmation) {
			const data = { projectId: project.id };
			axios
				.post("/backoffice/remove/project", data)
				.then((response) => {
					location.reload();
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const handleRemoveAnnounce = (event, announceId) => {
		event.preventDefault();

		const confirmation = confirm(
			"Etes vous sûr de vouloir retirer l'association avec cette annonce ?"
		);

		if (confirmation) {
			const data = { projectId: project.id, announceId: announceId };
			axios
				.post("/backoffice/remove/announce", data)
				.then((response) => {
					location.reload();
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<React.Fragment>
			<tr
				className={"trigger-drop-content " + (isSelected ? "selected" : "")}
				onClick={handleClickItem}
			>
				<td>
					<img src={arrow} alt="" />
				</td>
				<td>{project.projectName}</td>
				<td>{project.projectUrl}</td>

				<td>{project.form.length !== 0 ? project.form.length : "0"}</td>
				<td>
					{project.announces.length !== 0 ? project.announces.length : "0"}
				</td>
			</tr>
			{isSelected && (
				<tr className="project-content table-light">
					{/* A modifier si le nombre d'élément dans le tableau venait à changer */}

					<td colSpan={5}>
						<div className="formulaires">
							<h2>Formulaires :</h2>

							<div className="formulaires-items">
								<table className="table-secondary">
									<thead>
										<tr>
											<th>Nom du formulaire</th>
											<th>Email associé</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{project.form.length === 0 ? (
											<tr>
												<td colSpan={5}>
													<p>Aucun formulaire associé pour le moment</p>
												</td>
											</tr>
										) : (
											project.form.map((form) => {
												return (
													<tr key={form.id}>
														<td>{form.formName}</td>
														<td>
															{form.email ? form.email : "Aucun email associé"}
														</td>
														<td>
															<button className="btn btn-primary">
																<a href={"/form/edit/" + form.id}>Modifier</a>
															</button>
															<button
																className="btn btn-danger"
																onClick={(event) =>
																	handleRemoveForm(event, form.id)
																}
															>
																<a href="">Retirer</a>
															</button>
														</td>
													</tr>
												);
											})
										)}
									</tbody>
								</table>
							</div>

							<button className="btn btn-primary" onClick={handleAddFormButton}>
								<a href="">Ajouter un formulaire</a>
							</button>

							<button className="btn btn-primary">
								<a href="/form/api/form/add">Créer un formulaire</a>
							</button>

							{addFormTriggered ? (
								<SelectAddForm
									formList={getFormsFiltered()}
									projectId={project.id}
								/>
							) : null}
						</div>

						<div className="annonces">
							<h2>Annonces :</h2>

							<div className="annonces-items">
								<p>Aucune annonce associée pour le moment</p>

								<table className="table-secondary">
									<thead>
										<tr>
											<th>Titre de l'annonce</th>
											<th></th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{project.announces.length !== 0
											? project.announces.map((announce) => {
													return (
														<tr key={announce.id}>
															<td>{announce.title}</td>
															<td></td>
															<td>
																<button
																	className="btn btn-danger"
																	onClick={(event) =>
																		handleRemoveAnnounce(event, announce.id)
																	}
																>
																	<a href="">Retirer</a>
																</button>
															</td>
														</tr>
													);
											  })
											: null}
									</tbody>
								</table>
							</div>
							<button
								className="btn btn-primary"
								onClick={handleAddAnnounceButton}
							>
								<a href="">Ajouter une annonce</a>
							</button>

							{addAnnounceTriggered ? (
								<SelectAddAnnounce
									announceList={getAnnouncesFiltered()}
									projectId={project.id}
								/>
							) : null}

							<br />
							<button
								className="btn btn-danger mt-5"
								onClick={removeProjectHandler}
							>
								Supprimer le projet
							</button>
						</div>
					</td>
				</tr>
			)}
		</React.Fragment>
	);
};

export default ProjectContent;
