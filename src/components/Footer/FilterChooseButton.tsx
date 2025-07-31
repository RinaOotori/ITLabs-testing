import './FilterChooseButton.css'

export default function FilterChooseButton({tittle} : {tittle:string}) {
    return (
        <button id='filter_button'>{tittle}</button>
    )
}