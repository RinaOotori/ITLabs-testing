import './Input.css'
import './_type/Input_typeText.css'
import './_type/Input_typeCheckbox.css'
import * as React from "react";
import classNames from "classnames";

/* Поля ввода */
interface InputProps {
    type: string,
    label: string,
    value?: string,
    checked?: boolean,
    onChange: (value: string | boolean) => void
}

export const Input: React.FC<InputProps> = ({type, label, value, onChange, checked}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = type === 'checkbox' ? e.target.checked : e.target.value // Действие зависит от типа кнопки
        onChange(newValue)
    }

    return (
        <div className='Input'>
            <label htmlFor={label}>{label}</label>
            <input className={classNames({
                'Input_typeCheckbox': type == 'checkbox',
                'Input_typeText': type == 'text'
            })}
                   type={type}
                   value={type === 'text' ? value : undefined}
                   onChange={handleChange}
                   checked={type === 'checkbox' ? checked : undefined}
            />
        </div>
    )
}