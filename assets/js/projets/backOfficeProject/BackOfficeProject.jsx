import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import ProjectContent from "./components/ProjectContent";
import "../../../styles/projets/BackOffice_project/backoffice_project.scss";
import CreateProjectModal from "./components/CreateProjectModal";

const BackOfficeProject = () => {
	const [projectList, setProjectList] = useState(null);
	const [formList, setFormList] = useState(null);
	const [announceList, setAnnounceList] = useState(null);
	const [showModal, setShowModal] = useState(false);

	axios
		.get("votre_lien_api")
		.then(
			function (response) {
				this.setState({ data: response.data });
			}.bind(this)
		)
		.catch(function (error) {
			console.log(error);
		});

	useEffect(() => {
		axios
			.get("/backoffice/get/backoffice_project")
			.then((response) => {
				setProjectList(response.data);
			})
			.catch((error) => {
				console.log(error);
			});

		axios
			.get("/backoffice/get/backoffice_form")
			.then((response) => {
				setFormList(response.data);
			})
			.catch((error) => {
				console.log(error);
			});

		axios
			.get("/backoffice/get/backoffice_announce")
			.then((response) => {
				setAnnounceList(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div>
			<h1>BackOffice Projets</h1>

			<table className="table">
				<thead>
					<tr>
						<th></th>
						<th scope="col">Projet</th>
						<th scope="col">Projet URL</th>
						<th scope="col">Formulaires associés</th>
						<th scope="col">Annonces associées</th>
					</tr>
				</thead>
				<tbody>
					{projectList
						? projectList.map((project) => (
								<ProjectContent
									project={project}
									formList={formList}
									announceList={announceList}
									key={project.id}
								/>
						  ))
						: null}
				</tbody>
			</table>

			<button className="btn btn-primary" onClick={handleOpenModal}>
				<span>Créer un projet</span>
			</button>

			{showModal ? (
				<CreateProjectModal handleCloseModal={handleCloseModal} />
			) : null}
		</div>
	);
};

const root = document.getElementById("main");
createRoot(root).render(<BackOfficeProject />);
