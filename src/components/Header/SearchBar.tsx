import './SearchBar.css'
import Button from "../Button.tsx";
import {useState} from "react";
import Modal from "../Modal/Modal.tsx";

export default function SearchBar(){
    const [modalActive, setModalActive] = useState(false);
    return (
        <form>
            <input type='search' id='search_bar' placeholder='Поиск по имени'/>
            <Button tittle={'Добавить'} action={setModalActive}></Button>
            <Modal active={modalActive} setActive={setModalActive}/>
        </form>
    )
}