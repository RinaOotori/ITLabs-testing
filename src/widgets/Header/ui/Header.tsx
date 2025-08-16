import './Header.css'
import './-Logo/Header-Logo.css'
import {HeaderSearchBar} from "./-SearchBar";
import {HeaderClientsCounter} from "./-ClientsCounter";
import {Button} from "../../../shared/ui/Button";
import {Modal} from '../../Modal'
import {AddClientForm} from "../../../features/addClient";
import {useState} from "react";

export function Header() {
    const [modalActive, setModalActive] = useState(false);

    return (
        <header className='Header'>
            <img src='../../../../assets/logo.svg' alt="Логотип" className='Header-Logo'/>
            <div className='Header-Actons'>
                <HeaderSearchBar/>
                <Button tittle={'Добавить'} action={setModalActive}></Button>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <AddClientForm setModalActive={setModalActive}/>
            </Modal>
            <HeaderClientsCounter/>
        </header>
    )
}