import './FilterChooseButton.css'
import * as React from "react";

interface FilterChooseButtonProps {
    tittle: string,
    onClick: () => void
}

const FilterChooseButton: React.FC<FilterChooseButtonProps> = ({tittle, onClick}) => {
    return (
        <button id='filter_button' onClick={onClick}>{tittle}</button>
    )
}

export default FilterChooseButton;