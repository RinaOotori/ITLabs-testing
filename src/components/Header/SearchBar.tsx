import './SearchBar.css'
import Button from "../Button.tsx";

export default function SearchBar(){
    return (
        <form>
            <input type='search' id='search_bar' placeholder='Поиск по имени'/>
            <Button tittle={'Добавить'}></Button>
        </form>
    )
}