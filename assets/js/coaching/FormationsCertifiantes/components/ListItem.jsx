import React, { useState } from "react";

const ListItem = (props) => {
	const [isSelected, setIsSelected] = useState(false);

	const handleClickItem = () => {
		setIsSelected(!isSelected);
	};

	const content =
		props.children[1].props.children ?? props.children[1].props.children;

	return (
		<li className={"content-drop-list-item " + (isSelected ? "selected" : "")}>
			<div className="trigger-drop-text" onClick={handleClickItem}>
				{props.children[0].props.children}
			</div>

			{isSelected ? content : null}
		</li>
	);
};

export default ListItem;
