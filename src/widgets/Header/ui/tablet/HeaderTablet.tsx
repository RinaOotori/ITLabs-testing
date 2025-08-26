import './HeaderTablet.css'
import './-Content/HeaderTablet-Content.css'
import './-Logo/HeaderTablet-Logo.css'
import './-Actions/HeaderTablet-Actions.css'
import './-Button/HeaderTablet-Button.css'
import './-SearchBar/HeaderTablet-SearchBar.css'
import './-ClientsCounter/HeaderTablet-ClientsCounter.css'
import {useState} from "react";
import {SearchBar} from "../../../../shared/ui/common/SearchBar";
import {Button} from "../../../../shared/ui/common/Button";
import {ClientsCounter} from "../../../../shared/ui/common/ClientsCounter";
import {Modal} from "../../../Modal";
import {AddClientForm} from "../../../../features/addClient";
import logo from './../../../../shared/assets/logo.svg'
import logoDark from './../../../../shared/assets/logo_dark_version.svg'
import {useColorScheme} from "../../../../shared/hooks";

export function HeaderTablet() {
    const [modalActive, setModalActive] = useState(false);
    const theme = useColorScheme()

    return (
        <header className='HeaderTablet'>
            <div className='HeaderTablet-Content'>
                <img src={theme === 'light' ? logo : logoDark} alt="Логотип" className='HeaderTablet-Logo'/>
                <ClientsCounter classNames={'HeaderTablet-ClientsCounter'}/>
                <div className='HeaderTablet-Actions'>
                    <SearchBar classNames={'HeaderTablet-SearchBar'}/>
                    <Button tittle={'Добавить'} action={setModalActive} className={'HeaderTablet-Button'}/>
                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                    <AddClientForm setModalActive={setModalActive} active={modalActive}/>
                </Modal>
            </div>
        </header>
    )
}