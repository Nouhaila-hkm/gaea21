import React from "react";
import ListItem from "../../ListItem";

import imgContent1 from "../../../../../../images/coaching/formationsCertifiantes/pexels-fauxels-3184465.png";
import imgContent2 from "../../../../../../images/coaching/formationsCertifiantes/pexels-pixabay-301703.png";
import imgContent3 from "../../../../../../images/coaching/formationsCertifiantes/pexels-cottonbro-studio-4065158.png";
import imgContent4 from "../../../../../../images/coaching/formationsCertifiantes/pexels-karolina-grabowska-4207909.png";
import imgContent5 from "../../../../../../images/coaching/formationsCertifiantes/pexels-anete-lusina-5247994.png";

import partner from "../../../../../../images/coaching/formationsCertifiantes/noun-partner-3082015.svg";
import donation from "../../../../../../images/coaching/formationsCertifiantes/noun-donation-5141912.svg";
//A modifier, SVG non téléchargeable
import participer from "../../../../../../images/coaching/formationsCertifiantes/Groupe 2667.svg";
import video from "../../../../../../images/coaching/formationsCertifiantes/Groupe 2663.svg";
import rapport from "../../../../../../images/coaching/formationsCertifiantes/Groupe 2662.png";

const cardContent = {
	row1: [
		// Dossier Chômage :
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Dossier chômage </h2>
						<p>
							Le dossier chômage est un projet spécifique géré avec le
							département juridique dans le but d’obtenir une reconnaissance de
							notre métier.
						</p>
					</div>
					<img src={imgContent1} alt="" className="img-content" />
				</div>
			),

			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							Le dossier chômage est un projet spécifique géré avec le
							département juridique dans le but d’obtenir une reconnaissance de
							notre métier portant sur la{" "}
							<strong>réinsertion professionnelle</strong> et
							<strong> l’accompagnement en gestion de carrière</strong>.
							<br />
							<br />
							L’objectif est de pouvoir obtenir une{" "}
							<strong>reconnaissance</strong>, être <strong>mieux payé</strong>{" "}
							et avoir une <strong>certification</strong> pour le travail
							effectué par gaea21.
						</p>
					</div>
				</div>
			),
		},
		// Projet Métier Gaea21
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Projet métier gaea21</h2>
						<p>
							Le projet métiers gaea21 a pour objectif de pouvoir gérer les
							compétences métiers.
						</p>
					</div>
					<img src={imgContent2} alt="" className="img-content" />
				</div>
			),

			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							Le projet métiers gaea21 a pour objectif de pouvoir gérer les
							compétences métiers. Il s’agirait de mettre en place des
							compétences métiers dans le but de synthétiser tous les métiers
							existants (garagiste, libraire, etc..), puis d’identifier les
							métiers verts en collaboration avec l'organisation internationale
							BIT. Ainsi nous aurons des fiches-métiers complètes et un projet
							structuré.
						</p>
					</div>
					<div className="content-mt">
						<p>
							Il s’agirait aussi d’assurer la gestion des compétences des
							collaborateurs, particulièrement d’assurer le suivi des
							compétences par la gestion individuelles des coachés mais aussi
							par la validation des outils des gestion de compétences de gaea21,
							telles que:
							<br />
							<br />
						</p>
						<ul className="content-list">
							<li>le journal de bord,</li>
							<li>le questionnaire de satisfaction</li>
							<li>le tableau de compétences</li>
							<li>le tableau d'évaluation</li>
						</ul>
					</div>
				</div>
			),
		},
		// Modèle Pédagogique:
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Création de métiers / fillières</h2>
						<p>
							gaea21 voudrait créer des filières pour développer des métiers
							verts et gérer l’emploi.
						</p>
					</div>
					<img src={imgContent4} alt="" className="img-content" />
				</div>
			),

			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							gaea21 voudrait créer des filières pour développer des métiers
							verts et gérer l’emploi. La base du modèle de gaea21 est
							l’économie verte, l’économie circulaire, il faudrait donc créer
							des structures, des métiers et des entreprises, des facilitations
							à l’économie verte.
						</p>
					</div>

					<div className="buttons">
						<button className="form-btn">
							<p>Obtenir</p>
							<img src={partner} alt="" />
						</button>
						<button className="form-btn">
							<p>Partenariat</p>
							<img src={partner} alt="" />
						</button>
						<button className="form-btn">
							<p>Soutenir</p>
							<img src={donation} alt="" />
						</button>
						<button className="form-btn">
							<p>Obtenir</p>
							<img src={donation} alt="" />
						</button>
					</div>
				</div>
			),
		},
	],
	row2: [
		// Job greening program
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Job greening program</h2>

						<p>
							Il y a des programmes liés à des métiers existants servant à
							connaître les éléments spécifiques d’un métier qui répondrait à la
							problématique: comment réduire l’impact sur l’économie verte?
						</p>
					</div>
					<img src={imgContent5} alt="" className="img-content" />
				</div>
			),
			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							Il y a des programmes liés à des métiers existants servant à
							connaître les éléments spécifiques d’un métier qui répondrait à la
							problématique: comment réduire l’impact sur l’économie verte? La
							finalité de ce projet est de pouvoir proposer des métiers ad hoc
							répondant à cette problématique. A chaque métier, gaea21 cherchera
							à le rendre plus développé, plus durable, plus sustainable.
						</p>
					</div>

					<div className="buttons">
						<button className="form-btn">
							<p>Obtenir</p>
							<img src={partner} alt="" />
						</button>
						<button className="form-btn">
							<p>Partenariat</p>
							<img src={partner} alt="" />
						</button>
						<button className="form-btn">
							<p>Soutenir</p>
							<img src={donation} alt="" />
						</button>
						<button className="form-btn">
							<p>Obtenir</p>
							<img src={donation} alt="" />
						</button>
					</div>
				</div>
			),
		},
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Plateforme projet compétences</h2>

						<p>
							L’année prochaine, gaea21 lancera un projet, une plateforme projet
							compétences portant sur le projet réinsertion car la base de
							gaea21 est de faire de la réinsertion professionnelle
						</p>
					</div>
					<img src={imgContent3} alt="" className="img-content" />
				</div>
			),
			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							L’année prochaine, gaea21 lancera un projet, une plateforme projet
							compétences portant sur le projet réinsertion car la base de
							gaea21 est de faire de la réinsertion professionnelle, divisée en
							deux parties: de la recherche et de l’accompagnement en gestion de
							carrière qui est fondamentale dans le cadre du système de gaea21.
							<br />
							<br />
							Cette plateforme sera formalisée en même temps que le nouveau site
							de gaea21 qui sera terminé à la fin de l’année. L’agence de
							placement sera mise en place l’année prochaine.
						</p>
					</div>

					<div className="buttons">
						<button className="form-btn">
							<p>Obtenir</p>
							<img src={partner} alt="" />
						</button>
						<button className="form-btn">
							<p>Partenariat</p>
							<img src={partner} alt="" />
						</button>
						<button className="form-btn">
							<p>Soutenir</p>
							<img src={donation} alt="" />
						</button>
						<button className="form-btn">
							<p>Obtenir</p>
							<img src={donation} alt="" />
						</button>
					</div>
				</div>
			),
		},
	],
};

export default cardContent;
