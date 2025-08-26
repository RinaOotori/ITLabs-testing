import type {IClient} from "../../../entities/client";
import * as React from "react";

export interface UpdateClientProps {
    client: IClient,
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>,
    active: boolean
}