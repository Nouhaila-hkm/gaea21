import React from "react";
import ListItem from "../ListItem";

import divider from "../../../../../images/coaching/formationsCertifiantes/Rectangle 3198.png";
import arrow from "../../../../../images/coaching/formationsCertifiantes/Groupe 2248.svg";

import imgContent1 from "../../../../../images/coaching/formationsCertifiantes/pexels-artem-podrez-6991094.png";
import imgContent2 from "../../../../../images/coaching/formationsCertifiantes/pexels-anna-shvets-11286043.png";
import imgContent3 from "../../../../../images/coaching/formationsCertifiantes/1i9ls7_sxFJA0sIX-tlSY2sD45zbwD5qtUwitQU03ew.png";
const ProgrammeApplication = () => {
	return (
		<>
			<section className="section-header">
				<div>
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
				<div className="divider-bloc">
					<img src={divider} alt="" />
				</div>
			</section>
			<section className="section-content">
				<div className="content-flex">
					<div className="content-text">
						<h3>Programme Greening Your School</h3>

						<p>
							Il s’agit de créer une <strong>application gratuite</strong> pour
							les professeurs. C’est un programme touchant à plusieurs
							dimensions dans l’école, autour de l’école et des actions qui
							peuvent être menées à bien. Le but est de pouvoir{" "}
							<strong>créer un classement des écoles vertes</strong>. Ce
							programme GYS a pour but de <strong>sensibiliser</strong> les
							enfants et les adultes <strong>aux gestes à adopter</strong> via
							deux programmes, les programmes
							<strong> éco-gestes</strong> pour adultes et enfants qui sont
							adaptés à tout âge.
						</p>
					</div>
					<div>
						<img src={imgContent1} alt="" className="img-content" />
					</div>
				</div>
			</section>
			<section className="section-content">
				<div className="content-flex">
					<div className="content-text">
						<h3>Programme Eco-Ateliers</h3>

						<p>
							Les éco-ateliers sont des ateliers de{" "}
							<strong>sensibilisation à l’éco-consommation</strong>, destinés à
							des enfants de 6 à 14 ans. Les éco-ateliers prennent la forme de{" "}
							<strong>jeux</strong> et d'
							<strong>activités pédagogiques ludiques</strong> présentant des
							notions liées au développement durable comme l'économie
							circulaire, le cycle de vie des produits, les impacts d'un geste,
							etc. Ce programme est appliqué{" "}
							<strong>dans les écoles en Suisse, en France</strong> par divers
							moyens: le marketing et l’implémentation éco-atelier.
						</p>
					</div>
					<div>
						<img src={imgContent2} alt="" className="img-content" />
					</div>
				</div>
			</section>
			<section className="section-content">
				<div className="content-flex">
					<div className="content-text">
						<h3>Projets pilotes gaea21</h3>

						<p>
							Il existe deux projets de formations externes, données à tout
							public, en présentiel ou à distance, adaptées à l’âge des
							apprenants, s‘exportant en dehors du bassin genevois tels que le
							projet Sri Lanka et le projet Cameroun.
						</p>
					</div>
					<div>
						<img src={imgContent3} alt="" className="img-content" />
					</div>
				</div>
				<div className="content-drop-list">
					<ul>
						<ListItem>
							<div>
								<img src={arrow} alt="arrow" />
								<span>Projet Sri Lanka</span>
							</div>
							<div>
								<p className="content-drop-text first-drop-text">
									Le projet Sri Lanka est un projet externe dans le but de créer
									un écolage au Sri Lanka où les personnes pourraient avoir une
									formation sur les plantes médicinales. Dans ce but-ci le
									projet a été mis en place.
								</p>
								<div className="discover-project">
									<a href="">
										<button className="discover-project-btn">
											Découvrir le projet <strong>{">"}</strong>
										</button>
									</a>
								</div>
							</div>
						</ListItem>
						<ListItem>
							<div>
								<img src={arrow} alt="arrow" />
								<span>Projet Cameroun</span>
							</div>
							<div>
								<p className="content-drop-text first-drop-text">
									Le projet Cameroun est un projet qui a pour but de créer un
									centre de formation et d’incubation sur des métiers, des
									dimensions au moyen de recherches de méthodes pédagogiques
									innovantes.
								</p>
								<div className="discover-project">
									<a href="">
										<button className="discover-project-btn">
											Découvrir le projet <strong>{">"}</strong>
										</button>
									</a>
								</div>
							</div>
						</ListItem>
					</ul>
				</div>
			</section>
		</>
	);
};

export default ProgrammeApplication;
