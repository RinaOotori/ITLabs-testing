import './Modal.css'
import {type ReactNode} from "react";
import * as React from "react";

/* Стандартное модальное окно */
interface ModalProps {
    active: boolean,
    setActive: (value: boolean) => void,
    children: ReactNode // Содержимое окна
}

const Modal: React.FC<ModalProps> = ({active, setActive, children}) => {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal_content active' : 'modal_content'}
                 onClick={e => e.stopPropagation()}>
                <div id='close_button'>
                    <img src='../../../public/close_icon.svg' alt='Закрыть' onClick={() => setActive(false)}/>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal