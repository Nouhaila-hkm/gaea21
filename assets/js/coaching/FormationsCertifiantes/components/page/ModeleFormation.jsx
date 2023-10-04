import React from "react";

import divider from "../../../../../images/coaching/formationsCertifiantes/Rectangle 3198.png";

import imgContent1 from "../../../../../images/coaching/formationsCertifiantes/Groupe de masques 388.png";
import imgContent2 from "../../../../../images/coaching/formationsCertifiantes/pexels-kampus-production-5920774-removebg-preview.png";
import imgContent3 from "../../../../../images/coaching/formationsCertifiantes/Groupe de masques 392.png";
import imgContent4 from "../../../../../images/coaching/formationsCertifiantes/pexels-yan-krukau-8618069-removebg-preview.png";
import imgContent5 from "../../../../../images/coaching/formationsCertifiantes/pexels-max-fischer-5212317-removebg-preview.png";

const ModeleFormation = (props) => {
	const handlePage = (event, pageSelected) => {
		event.preventDefault();
		props.onChangePage(null, pageSelected);
	};
	return (
		<>
			<section className="section-header">
				<div className="text-centered">
					<h2 className="fw-bold">Besoin d'une formation ?</h2>
					<p>
						Le point de départ de ton coaching de carrière chez gaea21 ?<br />
						<strong>L’Ikigai</strong>, un concept japonais qui s’articule autour
						des différentes dimensions de notre personne :
					</p>
					<ul>
						<li>
							<p>
								<strong>Qui</strong> sommes-nous ?
							</p>
						</li>
						<li>
							<p>
								<strong>Quels</strong> sont nos <strong>talents</strong>,{" "}
								<strong>nos passions</strong> et <strong>nos envies</strong> ?
							</p>
						</li>
						<li>
							<p>
								Et <strong>comment faire </strong>pour que tous ces éléments
								rencontrent ce dont le monde a besoin ?
							</p>
						</li>
					</ul>
					<p>
						Le bilan <strong>Ikigai</strong> va aussi te permettre de trouver{" "}
						<strong>une activité professionnelle en adéquation</strong> avec ce
						qui est important pour toi, tant au niveau pro que perso !
					</p>
				</div>
				<div className="divider-bloc">
					<img src={divider} alt="" />
				</div>
			</section>
			<section className="section-content home-content">
				<div className="content-flex">
					<div className="content-text">
						<h2>Formation internes</h2>

						<p>
							Les formations internes incluent des recherches pédagogiques, une
							application de terrain et un suivi des formations et des
							certifications.
						</p>

						<a href="/formations/certifiantes/formation-interne">
							<button className="discover-project-btn">
								Découvrir <strong>{">"}</strong>
							</button>
						</a>
					</div>
					<div className="img-container">
						<img
							src={imgContent1}
							alt=""
							className="img-content"
							id="img-smaller"
						/>
						<div className="overlay-img-content"></div>
					</div>
				</div>
			</section>
			{/* <section className="section-content home-content ">
				<div className="content-flex">
					<div className="content-text">
						<h2>Projet réinsertion gaea21</h2>

						<p>
							Les projets de réinsertion de gaea21 ont pour but de former et de
							réorienter à la fois des demandeurs d’emploi ainsi que des
							personnes en reconversion professionnelle.
						</p>
						<a href="">
							<button
								className="discover-project-btn"
								onClick={(event) => handlePage(event, "projet-reinsertion")}
							>
								Découvrir <strong>{">"}</strong>
							</button>
						</a>
					</div>
					<div className="img-container">
						<img
							src={imgContent2}
							alt=""
							className="img-content"
							id="img-tall"
						/>
						<div className="overlay-img-content"></div>
					</div>
				</div>
			</section>
			<section className="section-content home-content ">
				<div className="content-flex">
					<div className="content-text">
						<h2>Projet création centre de formation gaea21</h2>

						<p>
							L’objectif à long terme du département est de devenir un centre de
							formation continue, de sensibiliser la population, membre ou non
							de gaea21, aux enjeux du développement durable par le biais de
							formations innovantes.
						</p>
						<a href="">
							<button
								className="discover-project-btn"
								onClick={(event) => handlePage(event, "projet-creation")}
							>
								Découvrir <strong>{">"}</strong>
							</button>
						</a>
					</div>
					<div className="img-container">
						<img
							src={imgContent3}
							alt=""
							className="img-content"
							id="img-tall"
						/>
						<div className="overlay-img-content"></div>
					</div>
				</div>
			</section>
			<section className="section-content home-content ">
				<div className="content-flex">
					<div className="content-text">
						<h2>Programme d'application (Sustainable school)</h2>

						<p>
							Le programme Sustainable School a pour objectif d’aider les écoles
							et organismes de formation à minimiser l’impact de leur activité,
							tout en leur permettant d’optimiser l’efficacité de leurs
							processus internes, et d’améliorer leur image.
						</p>
						<a href="">
							<button
								className="discover-project-btn"
								onClick={(event) => handlePage(event, "programme-application")}
							>
								Découvrir <strong>{">"}</strong>
							</button>
						</a>
					</div>
					<div className="img-container">
						<img
							src={imgContent4}
							alt=""
							className="img-content"
							id="img-tall"
						/>
						<div className="overlay-img-content"></div>
					</div>
				</div>
			</section> */}
			<section className="section-content home-content ">
				<div className="content-flex">
					<div className="content-text">
						<h2>Programme de recherche du département formations gaea21</h2>

						<p>
							Le programme de recherche vise à créer des centres de formation
							adaptés à chaque culture, partout dans le monde, par le biais de
							recherches pédagogiques. Telle est l’ambition finale de gaea21.
						</p>
						<a href="/formations/certifiantes/programme-de-recherche">
							<button className="discover-project-btn">
								Découvrir <strong>{">"}</strong>
							</button>
						</a>
					</div>
					<div className="img-container">
						<img
							src={imgContent5}
							alt=""
							className="img-content"
							id="img-tall"
						/>
						<div className="overlay-img-content"></div>
					</div>
				</div>
			</section>

			<div className="divider-bloc divider-final">
				<img src={divider} alt="" />
			</div>
		</>
	);
};

export default ModeleFormation;
