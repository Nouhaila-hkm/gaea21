import React, { useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import FormationsInternes from "./components/page/FormationsInternes";
import ProjetReinsertionGaea from "./components/page/ProjetReinsertionGaea";
import ProjetCreationCentreFormation from "./components/page/ProjetCreationCentreDeFormation";
import ProgrammeApplication from "./components/page/ProgrammeApplication";
import ModeleFormation from "./components/page/ModeleFormation";
import FormationCertifianteTemplate from "./FormationCertifianteTemplate";

import FormationInterne from "./components/page/FormationInterne/FormationInterne";

const FormationsCertifiantes = () => {
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
			<FormationCertifianteTemplate>
				<div className="container-lg">
					<section className="content-wrapper">
						<section className="home-rows">
							<ModeleFormation />
						</section>
					</section>
				</div>
			</FormationCertifianteTemplate>
		</>
	);
};

const root = document.getElementById("main");
createRoot(root).render(<FormationsCertifiantes />);
