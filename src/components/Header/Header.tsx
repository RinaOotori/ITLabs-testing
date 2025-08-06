import './Header.css'
import SearchBar from "./SearchBar.tsx";
import ClientsCounter from "./ClientsCounter.tsx";
import Button from "../Button/Button.tsx";
import Modal from "../Modal/Modal.tsx";
import AddClient from "../Modal/AddClient.tsx";
import {useState} from "react";

export default function Header() {
    const [modalActive, setModalActive] = useState(false);

    return (
        <header>
            <img src='../../../public/logo.svg' alt="Логотип" className='logo'/>
            <div id='header_actions'>
                <SearchBar/>
                <Button tittle={'Добавить'} type={'button'} action={setModalActive}></Button>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <AddClient setModalActive={setModalActive}/>
            </Modal>
            <ClientsCounter/>
        </header>
    )
}