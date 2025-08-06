import './FilterChooseButton.css'
import * as React from "react";

/* Кнопка фильтра */
interface FilterChooseButtonProps {
    tittle: string,
    isActive: boolean,
    onClick: () => void
}

const FilterChooseButton: React.FC<FilterChooseButtonProps> = ({tittle, onClick, isActive}) => {
    return (
        <button className={isActive ? 'filter_button active' : 'filter_button'} onClick={onClick} >{tittle}</button>
    )
}

export default FilterChooseButton;