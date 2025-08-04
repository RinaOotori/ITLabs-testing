import './InputField.css'
import * as React from "react";

interface InputFieldProps {
    type: string,
    label: string,
    required: boolean,
    onChange: (value: string | boolean) => void
}

const InputField: React.FC<InputFieldProps> = ({type, label, required, onChange}) => {
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
                   onChange={handleChange}
            />
        </div>
    )
}

export default InputField;