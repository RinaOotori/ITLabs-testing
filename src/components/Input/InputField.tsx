import './InputField.css'
import * as React from "react";

interface InputFieldProps {
    type: string,
    label: string,
    required: boolean,
    value?: string,
    checked?: boolean,
    onChange: (value: string | boolean) => void
}

const InputField: React.FC<InputFieldProps> = ({type, label, required, value, onChange, checked}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = type === 'checkbox' ? e.target.checked : e.target.value
        onChange(newValue)
    }

    return (
        <div className='input'>
            <label htmlFor={label}>{label}</label>
            <input required={required}
                   type={type}
                   id={label}
                   value={type === 'text' ? value : undefined}
                   onChange={handleChange}
                   checked={type === 'checkbox' ? checked : undefined}
            />
        </div>
    )
}

export default InputField;