import React, { useState, useRef } from "react";

import "../../../styles/_function.scss";
import "../../../styles/coaching/FormationsCertifiantes/formations_certifiantes_scss.scss";

import SignInButton from "../../../images/coaching/formationsCertifiantes/Composant 46 – 1.svg";

import imgHeader from "../../../images/coaching/formationsCertifiantes/Groupe de masques 390.png";

const FormationCertifianteTemplate = ({ children }) => {
	const scrollTo = useRef(null);

	const upPage = (event = null) => {
		event !== null ? event.preventDefault() : null;
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<>
			<section className="header">
				<div className="header-content">
					<div className="text-header" ref={scrollTo}>
						<h2>Le modèle de formation</h2>
						<p>
							gaea21 vous offre un panel de solutions en formations sur-mesure
							afin que vos compétences s'adaptent au mieux au marché du travail.
						</p>
						<a href="" className="signInButton">
							<img src={SignInButton} alt="" />
						</a>
					</div>
					<div className="image-header">
						<img src={imgHeader} alt="" />
					</div>
				</div>
				<div className="nav-content">
					<ul>
						<li>
							<a href="" className="underline-animation">
								Gestion de Carrière
							</a>
						</li>
						<li>
							<a href="/emploi-et-stage" className="underline-animation">
								Emploi / Stages
							</a>
						</li>
						<li>
							<a href="" className="underline-animation">
								Partenaires Formation / Emploi
							</a>
						</li>
						<li>
							<a href="" className="underline-animation">
								Le modèle de formation de gaea21
							</a>
						</li>
					</ul>
				</div>
			</section>
			<div className="container">
				<section className="content-wrapper">
					<a
						href="/formations/certifiantes/"
						className="underline-animation previous"
					>
						{"< Précédent"}
					</a>

					{children ? children : ""}
				</section>
				<div>
					<a href="" className="underline-animation page-up" onClick={upPage}>
						&and; Haut de page
					</a>
				</div>
			</div>
		</>
	);
};
export default FormationCertifianteTemplate;
