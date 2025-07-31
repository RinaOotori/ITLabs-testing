import './Button.css'

export default function Button({tittle} : {tittle: string}){
    return (
        <button id='button' value={tittle} type='submit'>{tittle}</button>
    )
}