import * as React from "react";

export interface AddClientProps {
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>,
    active: boolean
}