import './Modal.css'
import './-CloseButton/Modal-CloseButton.css'
import './-CloseButtonIcon/Modal-CloseButtonIcon.css'
import './_active/Modal_active.css'
import './-Content/Modal-Content.css'
import './-Content/_active/Modal-Content_active.css'
import {type ReactNode} from "react";
import * as React from "react";
import classNames from "classnames";

/* Стандартное модальное окно */
interface ModalProps {
    active: boolean,
    setActive: (value: boolean) => void,
    children: ReactNode // Содержимое окна
}

export const Modal: React.FC<ModalProps> = ({active, setActive, children}) => {
    return (
        <div className={classNames('Modal', {'Modal_active': active})}
             onClick={() => setActive(false)}>
            <div className={classNames('Modal-Content', {'Modal-Content_active': active})}
                 onClick={e => e.stopPropagation()}>
                <div className='Modal-CloseButton'>
                    <img src='../../../../assets/close_icon.svg' alt='Закрыть' className='Modal-CloseButtonIcon'
                         onClick={() => setActive(false)}/>
                </div>
                {children}
            </div>
        </div>
    )
}