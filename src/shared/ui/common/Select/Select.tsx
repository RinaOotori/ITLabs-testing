import './Select.css'
import './_active/Select_active.css'
import './-Icon/Select-Icon.css'
import './-Icon/_active/Select-Icon_active.css'
import './-List/_active/Select-List_active.css'
import './-Item/Select-Item.css'
import './-DropdownBlock/Select-DropdownBlock.css'
import './-DropdownBlock/_error/Select-DropdownBlock_error.css'
import './-Label/Select-Label.css'
import {useEffect, useState, useRef} from "react";
import * as React from "react";
import {ErrorMessage} from "../ErrorMessage";
import classNames from "classnames";
import dropdownIcon from './../../../assets/dropdown_icon.svg'

/* Выпадающее меню */
interface DropdownMenuProps {
    items: string[],
    label: string,
    errorMessage: string
    value?: string, // Текущее значение
    onClick: (value: string) => void
}

export const Select: React.FC<DropdownMenuProps> = ({items, label, value = 'Выбрать', onClick, errorMessage}) => {
    const [isOpen, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(value);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedItem(value)
    }, [value])

    const handleClick = (item: string) => {
        setSelectedItem(item);
        setOpen(false);
        onClick(item);
    }

    // Закрытие при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={selectRef} className={isOpen ? 'Select Select_active' : 'Select'}>
            <label className={'Select-Label'}>{label}</label>
            <div onClick={() => {
                setOpen(!isOpen)
            }} className={classNames({
                'Select-DropdownBlock': true,
                'Select-DropdownBlock_error': !!errorMessage
            })}>
                <span>{selectedItem}</span>
                <img src={dropdownIcon} alt='Выбрать'
                     className={isOpen ? 'Select-Icon Select-Icon_active' : 'Select-Icon'} onClick={() => {
                    setOpen(!isOpen)
                }}/>
                <ul className={isOpen ? 'Select-List Select-List_active' : 'Select-List'}>
                    {items.map(item => {
                        return <li onClick={() => handleClick(item)} className={'Select-Item'}>{item}</li>
                    })}
                </ul>
            </div>
            <div></div>
            {!!errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
    )
}