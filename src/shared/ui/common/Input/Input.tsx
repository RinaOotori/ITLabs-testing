import './Input.css'
import './_type/Input_type_text.css'
import './_type/Input_type_checkbox.css'
import './_error/Input_error.css'
import * as React from "react";
import classNames from "classnames";
import {ErrorMessage} from "../ErrorMessage";

/* Поля ввода */
interface InputProps {
    type: string,
    label: string,
    value?: string,
    checked?: boolean,
    onChange: (value: string | boolean) => void,
    errorMessage?: string
}

export const Input: React.FC<InputProps> = ({type, label, value, onChange, checked, errorMessage}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = type === 'checkbox' ? e.target.checked : e.target.value // Действие зависит от типа кнопки
        onChange(newValue)
    }

    return (
        <div className='Input'>
            <label htmlFor={label}>{label}</label>
            <input className={classNames({
                'Input_type_checkbox': type == 'checkbox',
                'Input_type_text': type == 'text',
                'Input_error': !!errorMessage
            })}
                   type={type}
                   name={label}
                   value={type === 'text' ? value : undefined}
                   onChange={handleChange}
                   checked={type === 'checkbox' ? checked : undefined}
            />
            <div></div>
            {!!errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
    )
}