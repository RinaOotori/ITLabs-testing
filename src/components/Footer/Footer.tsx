import './Footer.css'
import FilterChooseButton from "./FilterChooseButton.tsx";

export default function Footer(){
return (
    <footer>
        <span>Фильтровать по: </span>
        <FilterChooseButton tittle='Отсутствующим'></FilterChooseButton>
        <FilterChooseButton tittle='Присутствующим'></FilterChooseButton>
        <FilterChooseButton tittle='Без фильтра'></FilterChooseButton>
    </footer>

)
}