import React from "react";
import ListItem from "../../ListItem";

import arrow from "../../../../../../images/coaching/formationsCertifiantes/Groupe 2248.svg";

import imgContent1 from "../../../../../../images/coaching/formationsCertifiantes/pexels-artem-podrez-6991094.png";
import imgContent2 from "../../../../../../images/coaching/formationsCertifiantes/pexels-anna-shvets-11286043.png";
import imgContent3 from "../../../../../../images/coaching/formationsCertifiantes/1i9ls7_sxFJA0sIX-tlSY2sD45zbwD5qtUwitQU03ew.png";

import partner from "../../../../../../images/coaching/formationsCertifiantes/noun-partner-3082015.svg";
import donation from "../../../../../../images/coaching/formationsCertifiantes/noun-donation-5141912.svg";
import video from "../../../../../../images/coaching/formationsCertifiantes/Groupe 2663.svg";
import rapport from "../../../../../../images/coaching/formationsCertifiantes/Groupe 2662.png";
import obtenir from "../../../../../../images/coaching/formationsCertifiantes/noun-people-768961.svg";

const cardContent = {
	row1: [
		// Programme Greening Your School:
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Programme Greening Your School</h2>
						<p>
							Il s’agit de créer une <strong>application gratuite</strong> pour
							les professeurs, touchant à plusieurs dimensions dans l’école,
							autour de l’école et des actions qui peuvent être menées à bien.
						</p>
					</div>
					<img src={imgContent1} alt="" className="img-content" />
				</div>
			),

			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
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
					<div className="content-mt">
						<p>
							La raison d’existence de gaea21 est fondée sur{" "}
							<strong>le besoin d’informer et de former en externe</strong>. Le
							projet développe<strong> des programmes</strong> à destination de
							différents publics afin de <strong>sensibiliser</strong> le plus
							grand nombre aux enjeux du développement durable par le biais de{" "}
							<strong>formations innovantes</strong>. En somme, le centre de
							formations externes a été mis en place afin de{" "}
							<strong>
								sensibiliser une majorité de personnes sur leurs comportements
							</strong>{" "}
							et <strong>leur manière de consommer</strong> et{" "}
							<strong>de les rendre consomm’acteurs</strong>.
						</p>
					</div>

					<div className="video">
						<img src={video} alt="" />
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
							<img src={obtenir} alt="" />
						</button>
					</div>
				</div>
			),
		},
		// Programme Eco-Ateliers
		{
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Programme Eco-Ateliers</h2>
						<p>
							Les éco-ateliers sont des ateliers de{" "}
							<strong>sensibilisation à l’éco-consommation</strong>, destinés à
							des enfants de 6 à 14 ans.
						</p>
					</div>
					<img src={imgContent2} alt="" className="img-content" />
				</div>
			),

			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
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
							<img src={obtenir} alt="" />
						</button>
					</div>
				</div>
			),
		},
		{
			// Projets pilotes gaea21
			cardContent: (
				<div className="card-content">
					<div className="content-text">
						<h2>Projets pilotes gaea21</h2>
						<p>
							Il existe deux projets de formations externes, données à tout
							public, en présentiel ou à distance, adaptées à l’âge des
							apprenants, s‘exportant en dehors du bassin genevois tels que le
							projet Sri Lanka et le projet Cameroun.
						</p>
					</div>
					<img src={imgContent3} alt="" className="img-content" />
				</div>
			),

			hiddenContent: (
				<div className="drop-content">
					<div className="content-text">
						<p>
							Il existe deux projets de formations externes, données à tout
							public, en présentiel ou à distance, adaptées à l’âge des
							apprenants, s‘exportant en dehors du bassin genevois tels que le
							projet Sri Lanka et le projet Cameroun.
						</p>
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
										Le projet Sri Lanka est un projet externe dans le but de
										créer un écolage au Sri Lanka où les personnes pourraient
										avoir une formation sur les plantes médicinales. Dans ce
										but-ci le projet a été mis en place.
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
				</div>
			),
		},
	],
};

export default cardContent;
