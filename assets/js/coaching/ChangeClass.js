import React, { useState } from "react";

export default function ChangeClass() {
    const [isSelected, setIsSelected] = useState(false);

    function handleClick() {
        setIsSelected(isSelected => !isSelected);
    };

    return (
        <div className={isSelected ? 'selected' : 'notSelected'} onClick={handleClick}>
            Hello
        </div>
    )
}