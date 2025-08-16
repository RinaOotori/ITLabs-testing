import './Button.css'
import './_type/Button_typeSuccess.css'
import './_type/Button_typeInfo.css'
import './_type/Button_typeDanger.css'
import * as React from "react";

/* Стандартная кнопка */
interface ButtonProps {
    tittle: string,
    type?: 'Success' | 'Danger' | 'Info',
    action?: (value: boolean) => void
}

export const Button: React.FC<ButtonProps> = ({tittle, type = 'Success', action}) => {
    return (
        <button className={`Button Button_type${type}`}
                value={tittle}
                onClick={() => {
                    action?.(true)
                }}>
            {tittle}
        </button>
    )
}