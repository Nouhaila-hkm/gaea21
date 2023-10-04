import React, { useState } from "react";

const ProfileNavigation = (props) => {
	const [elementSelected, setElementSelected] = useState("mon-compte");

	const handleElementSelected = (value) => {
		setElementSelected(value);
		props.onSectionChange(value);
	};

	return (
		<>
			<ul className="navigation-profile">
				<li
					onClick={() => handleElementSelected("mon-compte")}
					className={elementSelected === "mon-compte" ? "selected" : undefined}
				>
					<p>Mon compte</p>
				</li>
				<li
					onClick={() => handleElementSelected("ma-communauté")}
					className={
						elementSelected === "ma-communauté" ? "selected" : undefined
					}
				>
					<p>Ma communauté</p>
				</li>
				<li
					onClick={() => handleElementSelected("mes-communautés")}
					className={
						elementSelected === "mes-communautés" ? "selected" : undefined
					}
				>
					<p>Mes communautés gaea21</p>
				</li>
				<li
					onClick={() => handleElementSelected("mes-emplois-stages")}
					className={
						elementSelected === "mes-emplois-stages" ? "selected" : undefined
					}
				>
					<p>Mes emplois/ stages</p>
				</li>
				<li
					onClick={() => handleElementSelected("mes-formations")}
					className={
						elementSelected === "mes-formations" ? "selected" : undefined
					}
				>
					<p>Mes formations</p>
				</li>
				<li
					onClick={() => handleElementSelected("mes-projets")}
					className={elementSelected === "mes-projets" ? "selected" : undefined}
				>
					<p>Mes projets gaea21</p>
				</li>
				<li
					onClick={() => handleElementSelected("thematiques")}
					className={elementSelected === "thematiques" ? "selected" : undefined}
				>
					<p>Thématiques</p>
				</li>
				<li
					onClick={() => handleElementSelected("univers-gaea21")}
					className={
						elementSelected === "univers-gaea21" ? "selected" : undefined
					}
				>
					<p>Univers gaea21</p>
				</li>
			</ul>
			<ul>
				<li>Me déconnecter</li>
			</ul>
		</>
	);
};

export default ProfileNavigation;
