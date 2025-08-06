import './DropdownMenu.css'
import {useEffect, useState} from "react";
import * as React from "react";

/* Выпадающее меню */
interface DropdownMenuProps{
    items: string[],
    label: string,
    value: string, // Текущее значение
    onClick: (value: string) => void
}
const DropdownMenu: React.FC<DropdownMenuProps> = ({items, label, value, onClick})=> {
    const [isOpen, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(value);

    useEffect(() => {setSelectedItem(value)}, [value])

    const handleClick = (item: string) => {
        setSelectedItem(item);
        setOpen(false);
        onClick(item);
    }

    return (
        <div className={isOpen ? 'dropdown active' : 'dropdown'}>
            <label>{label}</label>
            <div>
                <span>{selectedItem}</span>
                <img src='../../../public/dropdown_icon.svg' alt='Выбрать'
                     className={isOpen ? 'dropdown_icon active' : 'dropdown_icon'} onClick={() => {
                    setOpen(!isOpen)
                }}/>
                <ul className={isOpen ? 'dropdown_content active' : 'dropdown_content'}>
                {items.map(item => {
                    return <li onClick={() => handleClick(item)}>{item}</li>
                })}
                </ul>
            </div>
        </div>
    )
}

export default DropdownMenu;