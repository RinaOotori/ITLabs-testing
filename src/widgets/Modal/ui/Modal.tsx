import './Modal.css'
import './-CloseButton/Modal-CloseButton.css'
import './-CloseButtonIcon/Modal-CloseButtonIcon.css'
import './_active/Modal_active.css'
import './-Container/Modal-Container.css'
import './-Container/_active/Modal-Container_active.css'
import './-Content/Modal-Content.css'
import * as React from "react";
import classNames from "classnames";
import type {ModalProps} from "../model/ModalProps.ts";
import closeIcon from './../../../shared/assets/close_icon.svg'

/* Стандартное модальное окно */
export const Modal: React.FC<ModalProps> = ({active, setActive, children}) => {
    return (
        <div className={classNames('Modal', {'Modal_active': active})}
             onClick={() => setActive(false)}>
            <div className={classNames('Modal-Container', {'Modal-Container_active': active})}
                 onClick={e => e.stopPropagation()}>
                <div className='Modal-CloseButton'>
                    <img src={closeIcon} alt='Закрыть' className='Modal-CloseButtonIcon'
                         onClick={() => setActive(false)}/>
                </div>
                <div className='Modal-Content'>
                    {children}
                </div>
            </div>
        </div>
    )
}