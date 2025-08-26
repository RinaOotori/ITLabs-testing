import {useState} from "react";
import {ClientsCounter} from "../../../../shared/ui/common/ClientsCounter";
import {SearchBar} from "../../../../shared/ui/common/SearchBar";
import {Button} from "../../../../shared/ui/common/Button";
import {Modal} from "../../../Modal";
import {AddClientForm} from "../../../../features/addClient";
import './-SearchBar/HeaderMobile-SearchBar.css'
import './-Button/HeaderMobile-Button.css'
import './-Logo/HeaderMobile-Logo.css'
import './-Content/-Content.css'
import {useColorScheme} from "../../../../shared/hooks";
import logo from './../../../../shared/assets/logo.svg'
import logoDark from './../../../../shared/assets/logo_dark_version.svg'

export function HeaderMobile() {
    const [modalActive, setModalActive] = useState(false);
    const theme = useColorScheme()

    return (
        <header className='HeaderMobile'>
            <div className='HeaderMobile-Content'>
                <img src={theme === 'light' ? logo : logoDark} alt="Логотип" className='HeaderMobile-Logo'/>
                <ClientsCounter/>
                <div className='HeaderMobile-Actions'>
                    <SearchBar classNames={'HeaderMobile-SearchBar'}/>
                    <Button tittle={'Добавить'} action={setModalActive} className={'HeaderMobile-Button'}/>
                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                    <AddClientForm setModalActive={setModalActive} active={modalActive}/>
                </Modal>
            </div>
        </header>
    )
}