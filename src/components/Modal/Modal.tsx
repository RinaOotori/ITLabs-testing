import './Modal.css'
import type {ReactNode} from "react";

export default function Modal({active, setActive, children}: { active: boolean, setActive: (value: boolean) => void, children: ReactNode }) {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal_content active' : 'modal_content'}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}