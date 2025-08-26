import type {ReactNode} from "react";

export interface ModalProps {
    active: boolean,
    setActive: (value: boolean) => void,
    children: ReactNode // Содержимое окна
}