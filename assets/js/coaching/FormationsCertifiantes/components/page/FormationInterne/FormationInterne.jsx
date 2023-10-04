import React from "react";
import { createRoot } from "react-dom/client";

import divider from "../../../../../../images/coaching/formationsCertifiantes/Rectangle 3198.png";

import cardContent from "./Content";
import CardRows from "../../../CardRows";
import FormationCertifianteTemplate from "../../../FormationCertifianteTemplate";

const FormationInterne = () => {
	return (
		<FormationCertifianteTemplate>
			<section className="home-content section-content">
				<div className="content-text">
					<h2>Formation internes</h2>
					<p>
						Les formations internes incluent des recherches pédagogiques, une
						application de terrain et un suivi des formations et des
						certifications.
					</p>
				</div>
			</section>
			<CardRows rowsContent={cardContent}></CardRows>
			<div className="divider-bloc">
				<img src={divider} alt="" />
			</div>

			<section className="home-content section-content">
				<div className="content-text">
					<h2>Formations appliquées</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
						tenetur omnis, eaque consequatur nobis, fuga vel ducimus animi
						repudiandae cum saepe minus dolores dolorum voluptatem.
					</p>
				</div>
			</section>
			<CardRows rowsContent={cardContent}></CardRows>
			<div className="divider-bloc">
				<img src={divider} alt="" />
			</div>

			<section className="home-content section-content">
				<div className="content-text">
					<h2>Certificats de compétences acquises</h2>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
						pariatur saepe, unde, odit dicta hic fuga sed eligendi reiciendis
						vero, dolorum in rerum explicabo repudiandae.
					</p>
				</div>
			</section>
			<CardRows rowsContent={cardContent}></CardRows>
			<div className="divider-bloc">
				<img src={divider} alt="" />
			</div>

			<section className="home-content section-content">
				<div className="content-text">
					<h2>Formations complémentaires/efficacité travail</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
						tenetur omnis, eaque consequatur nobis, fuga vel ducimus animi
						repudiandae cum saepe minus.
					</p>
				</div>
			</section>
			<CardRows rowsContent={cardContent}></CardRows>
		</FormationCertifianteTemplate>
	);
};

const root = document.getElementById("main");
createRoot(root).render(<FormationInterne />);
