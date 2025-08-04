import './DropdownMenu.css'
import {useState} from "react";
import * as React from "react";

interface DropdownMenuProps{
    items: string[],
    label: string,
    value: string,
    onClick: (value: string) => void
}
const DropdownMenu: React.FC<DropdownMenuProps> = ({items, label, value, onClick})=> {
    const defaultValue = 'Выбрать';
    const [isOpen, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(defaultValue);

    const handleClick = (item: string) => {
        setSelectedItem(item);
        setOpen(false);
        onClick(item);
    }

    return (
        <div className={isOpen ? 'dropdown active' : 'dropdown'}>
            <label>{label}</label>
            <div>
                <span>{selectedItem === null ? value : selectedItem}</span>
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