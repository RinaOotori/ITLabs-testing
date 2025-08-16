import './Footer-FilterChooseButton.css'
import './_active/Footer-FilterChooseButton_active.css'
import * as React from "react";
import classNames from "classnames";

/* Кнопка фильтра */
interface FilterChooseButtonProps {
    tittle: string,
    isActive: boolean,
    onClick: () => void
}

const FooterFilterChooseButton: React.FC<FilterChooseButtonProps> = ({tittle, onClick, isActive}) => {
    return (
        <button className={classNames({
            'Footer-FilterButton Footer-FilterButton_active': isActive,
            'Footer-FilterButton': !isActive})}
                onClick={onClick}>{tittle}
        </button>
    )
}

export default FooterFilterChooseButton;