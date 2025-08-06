import './InputField.css'
import * as React from "react";

/* Поля ввода */
interface InputFieldProps {
    type: string,
    label: string,
    value?: string,
    checked?: boolean,
    onChange: (value: string | boolean) => void
}

const InputField: React.FC<InputFieldProps> = ({type, label, value, onChange, checked}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = type === 'checkbox' ? e.target.checked : e.target.value // Действие зависит от типа кнопки
        onChange(newValue)
    }

    return (
        <div className='input'>
            <label htmlFor={label}>{label}</label>
            <input type={type}
                   id={label}
                   value={type === 'text' ? value : undefined}
                   onChange={handleChange}
                   checked={type === 'checkbox' ? checked : undefined}
            />
        </div>
    )
}

export default InputField;