import './Button.css'
import './_style/Button_style_success.css'
import './_style/Button_style_info.css'
import './_style/Button_style_danger.css'
import * as React from "react";
import classNames from "classnames";

/* Стандартная кнопка */
interface ButtonProps {
    tittle: string,
    className?: string,
    type?: 'button' | 'submit' | 'reset',
    style?: 'success' | 'danger' | 'info',
    action?: (value: boolean) => void
}

export const Button: React.FC<ButtonProps> = ({tittle, style = 'success', action, type = 'button', className}) => {
    return (
        <button className={classNames({
            'Button': true,
            [`Button_style_${style}`]: true,
            [`${className}`]: true
        })}
                value={tittle}
                type={type}
                onClick={() => {
                    action?.(true)
                }}>
            {tittle}
        </button>
    )
}