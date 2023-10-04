import React from "react";
import { createRoot } from "react-dom/client";
import divider from "../../../../../../images/coaching/formationsCertifiantes/Rectangle 3198.png";

import cardContentRecherches from "./ProgrammeDeRechercheContent";
import cardContentReinsertion from "./ProjetReinsertionContent";
import cardContentApplication from "./ProgrammeApplicationContent";
import CardRows from "../../../CardRows";
import FormationCertifianteTemplate from "../../../FormationCertifianteTemplate";

const ProgrammeRecherche = () => {
	return (
		<FormationCertifianteTemplate>
			<section className="home-content section-content">
				<div className="content-text">
					<h2>Programme de recherche du département formation gaea21</h2>
					<p>
						Le programme de recherche vise à créer des centres de formation
						adaptés à chaque culture, partout dans le monde, par le biais de
						recherches pédagogiques. Telle est l’ambition finale de gaea21.
					</p>
				</div>
			</section>
			<CardRows rowsContent={cardContentRecherches}></CardRows>

			<div className="divider-bloc">
				<img src={divider} alt="" />
			</div>

			<section className="home-content section-content">
				<div className="content-text">
					<h2 className="fw-bold">Projet de réinsertion gaea21</h2>
					<p>
						Les projets de réinsertion de gaea21 ont pour but de former et de
						réorienter à la fois des demandeurs d’emploi ainsi que des personnes
						en reconversion professionnelle.
					</p>
				</div>
			</section>

			<CardRows rowsContent={cardContentReinsertion}></CardRows>

			<div className="divider-bloc">
				<img src={divider} alt="" />
			</div>

			<section className="home-content section-content">
				<div className="content-text">
					<h2 className="fw-bold">
						Programme d'application (Sustainable school)
					</h2>
					<p>
						Le programme Sustainable School a pour objectif d’aider les écoles
						et organismes de formation à minimiser l’impact de leur activité,
						tout en leur permettant d’optimiser l’efficacité de leurs processus
						internes, et d’améliorer leur image.
					</p>
				</div>
			</section>

			<CardRows rowsContent={cardContentApplication}></CardRows>
		</FormationCertifianteTemplate>
	);
};

const root = document.getElementById("main");
createRoot(root).render(<ProgrammeRecherche />);
