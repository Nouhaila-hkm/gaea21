import React, { useState } from "react";
import { useEffect } from "react";
import { array, element } from "prop-types";

// Composant de carte
const Card = (props) => {
	return (
		<div
			className={"card " + (props.selected === true ? "" : "card-disabled")}
			onClick={props.onClick}
		>
			{props.content}
		</div>
	);
};

// Composant de ligne de cartes
const CardRow = (props) => {
	const [hiddenContent, setHiddenContent] = useState(null);
	const [selectedCard, setSelectedCard] = useState([]);

	useEffect(() => {
		//utlisée afin de donner une base générale au useState pour éviter de rappeler le composant pour chaque élément

		var cardsMap = [];
		props.cards.map((element, index) => {
			cardsMap = [...cardsMap, { key: index, selected: false }];
		});
		setSelectedCard(cardsMap);
	}, []);

	const handleCardSelected = (index) => {
		props.handleRowSelected();

		setSelectedCard((currentArray) => {
			currentArray.map((currentValue, currentIndex) => {
				if (currentIndex !== index) {
					currentValue.selected = false;
				} else {
					currentValue.selected = !currentValue.selected;

					if (currentValue.selected === true) {
						setHiddenContent(props.cards[index].hiddenContent);
					} else {
						setHiddenContent(null);
					}
				}
			});

			return currentArray;
		});
	};

	return selectedCard.length > 0 ? (
		<div>
			<div className="card-row">
				{props.cards.map((card, index) => (
					<Card
						key={index}
						content={card.cardContent}
						onClick={() => handleCardSelected(index)}
						selected={props.rowSelected ? selectedCard[index].selected : false}
					/>
				))}
			</div>
			{hiddenContent !== null && props.rowSelected === true ? (
				<div>{hiddenContent}</div>
			) : null}
		</div>
	) : null;
};

// Composant parent
const CardRows = (props) => {
	const [rowSelected, setRowSelected] = useState(null);

	// utlisée afin de donner une base générale au useState pour éviter de rappeler le composant pour chaque élément
	var rowSelectedBase = [];

	const handleRowSelected = (index) => {
		const updateRow = rowSelectedBase.map((element) => {
			//On indique quel 'row' doit être active pour afficher le contenu
			if (index === element.index) {
				return { ...element, isSelected: true };
			} else {
				return { ...element, isSelected: false };
			}
		});

		setRowSelected(updateRow);
	};

	const rowsContent = props.rowsContent;

	var rowsArray = [];

	Object.keys(props.rowsContent).map((key, value) => {
		const cards = props.rowsContent[key];
		rowSelectedBase = [...rowSelectedBase, { index: value, isSelected: false }];
		const content = (
			<CardRow
				cards={cards}
				key={value}
				rowSelected={rowSelected ? rowSelected[value].isSelected : null}
				handleRowSelected={() => handleRowSelected(value)}
			/>
		);
		rowsArray = [...rowsArray, content];
	});

	useEffect(() => {
		setRowSelected(rowSelectedBase);
	}, []);

	return (
		<div>
			{rowsArray.map((element, key) => {
				return element;
			})}
		</div>
	);
};

export default CardRows;
