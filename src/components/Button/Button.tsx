import './Button.css'
import * as React from "react";

interface ButtonProps {
    tittle: string,
    type: "button" | "submit" | "reset" | undefined,
    action: (flag: boolean) => void
}

const Button: React.FC<ButtonProps> = ({tittle, type, action})=> {
    return (
        <button id='button'
                value={tittle}
                type={type}
                onClick={() => {
                    action(true);
                }}>
            {tittle}
        </button>
    )
}

export default Button;