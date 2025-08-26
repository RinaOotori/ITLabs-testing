import * as React from "react";
import './ErrorMessage.css'

interface ErrorMessageProps {
    message: string
}
export const ErrorMessage:React.FC<ErrorMessageProps> = ({message}) => {
    return (
        <div className={'ErrorMessage'}>{message}</div>
    )
}