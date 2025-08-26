import './Header.css'
import './-Logo/Header-Logo.css'
import './-Content/Header-Content.css'
import './-SearchBar/Header-SearchBar.css'
import './-ClientsCounter/Header-ClientsCounter.css'
import './-Actions/Header-Actions.css'
import logo from './../../../../shared/assets/logo.svg'
import logoDark from './../../../../shared/assets/logo_dark_version.svg'
import {SearchBar} from "../../../../shared/ui/common/SearchBar";
import {Button} from "../../../../shared/ui/common/Button";
import {Modal} from '../../../Modal'
import {AddClientForm} from "../../../../features/addClient";
import {useState} from "react";
import {ClientsCounter} from "../../../../shared/ui/common/ClientsCounter";
import {useColorScheme} from "../../../../shared/hooks";

export function Header() {
    const [modalActive, setModalActive] = useState(false);
    const theme = useColorScheme()


    return (
        <header className='Header'>
            <div className='Header-Content'>
            <img src={theme === 'light' ? logo : logoDark} alt="Логотип" className='Header-Logo'/>
            <div className='Header-Actions'>
                <SearchBar classNames={'Header-SearchBar'}/>
                <Button tittle={'Добавить'} action={setModalActive}></Button>
            </div>
            <ClientsCounter classNames={'Header-ClientsCounter'}/>
            <Modal active={modalActive} setActive={setModalActive}>
                <AddClientForm setModalActive={setModalActive} active={modalActive}/>
            </Modal>
            </div>
        </header>
    )
}