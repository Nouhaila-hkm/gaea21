import React from "react";
import divider from "../../../../../images/coaching/formationsCertifiantes/Rectangle 3198.png";
import imgContent1 from "../../../../../images/coaching/formationsCertifiantes/pexels-fauxels-3184465.png";
import imgContent2 from "../../../../../images/coaching/formationsCertifiantes/pexels-pixabay-301703.png";
import imgContent3 from "../../../../../images/coaching/formationsCertifiantes/pexels-cottonbro-studio-4065158.png";
import imgContent4 from "../../../../../images/coaching/formationsCertifiantes/pexels-karolina-grabowska-4207909.png";
import imgContent5 from "../../../../../images/coaching/formationsCertifiantes/pexels-anete-lusina-5247994.png";
const ProjetReinsertionGaea = () => {
	return (
		<>
			{/* Projet de réinsertion */}
			<section className="section-header">
				<div>
					<h2 className="fw-bold">Projet de réinsertion gaea21</h2>
					<p>
						Les projets de réinsertion de gaea21 ont pour but de former et de
						réorienter à la fois des demandeurs d’emploi ainsi que des personnes
						en reconversion professionnelle.
					</p>
				</div>
				<div className="divider-bloc">
					<img src={divider} alt="" />
				</div>
			</section>

			{/* Dossier Chômage*/}
			<section className="section-content">
				<div className="content-flex">
					<div className="content-text">
						<h3>Dossier chômage</h3>

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
					<div>
						<img src={imgContent1} alt="" className="img-content" />
					</div>
				</div>
			</section>

			{/* Projet Métier Gaea21 */}
			<section className="section-content">
				<div>
					<div className="content-flex">
						<div className="content-text">
							<h3>Projet métier gaea21</h3>.
							<p>
								Le projet métiers gaea21 a pour objectif de pouvoir gérer les
								compétences métiers. Il s’agirait de mettre en place des
								compétences métiers dans le but de synthétiser tous les métiers
								existants (garagiste, libraire, etc..), puis d’identifier les
								métiers verts en collaboration avec l'organisation
								internationale BIT. Ainsi nous aurons des fiches-métiers
								complètes et un projet structuré.
							</p>
						</div>
						<div className="img">
							<img src={imgContent2} alt="" className="img-content" />
						</div>
					</div>
				</div>

				<div className="content-mt">
					<p>
						Il s’agirait aussi d’assurer la gestion des compétences des
						collaborateurs, particulièrement d’assurer le suivi des compétences
						par la gestion individuelles des coachés mais aussi par la
						validation des outils des gestion de compétences de gaea21, telles
						que:
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
			</section>

			<section className="section-content">
				<div>
					<div className="content-flex">
						<div className="content-text">
							<h3>Création de métiers / fillières</h3>.
							<p>
								gaea21 voudrait créer des filières pour développer des métiers
								verts et gérer l’emploi. La base du modèle de gaea21 est
								l’économie verte, l’économie circulaire, il faudrait donc créer
								des structures, des métiers et des entreprises, des
								facilitations à l’économie verte.
							</p>
						</div>
						<div className="img">
							<img src={imgContent4} alt="" className="img-content" />
						</div>
					</div>
				</div>
			</section>
			<section className="section-content">
				<div>
					<div className="content-flex">
						<div className="content-text">
							<h3>Job greening program</h3>.
							<p>
								Il y a des programmes liés à des métiers existants servant à
								connaître les éléments spécifiques d’un métier qui répondrait à
								la problématique: comment réduire l’impact sur l’économie verte?
								La finalité de ce projet est de pouvoir proposer des métiers ad
								hoc répondant à cette problématique. A chaque métier, gaea21
								cherchera à le rendre plus développé, plus durable, plus
								sustainable.
							</p>
						</div>
						<div className="img">
							<img src={imgContent5} alt="" className="img-content" />
						</div>
					</div>
				</div>
			</section>
			<section className="section-content">
				<div className="content-flex">
					<div className="content-text">
						<h3>Plateforme projet compétences</h3>
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
					<div>
						<img src={imgContent3} alt="" className="img-content" />
					</div>
				</div>
			</section>
		</>
	);
};

export default ProjetReinsertionGaea;
