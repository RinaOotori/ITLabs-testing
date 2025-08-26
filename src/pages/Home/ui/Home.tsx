import './Home.css'
import {useState} from "react";
import {createEmptyIClient, type IClient} from "../../../entities/client";
import {Modal} from "../../../widgets/Modal";
import {ClientsList} from "../../../widgets/ClientsList";
import {UpdateClientForm} from "../../../features/updateClient";

/* Начальная страница */
export function Home() {
    const [changeModalActive, setChangeModalActive] = useState(false)
    const [selectedClient, setSelectedClient] = useState<IClient>(createEmptyIClient)

    const handleRowClick = (client: IClient) => {
        setChangeModalActive(true)
        setSelectedClient(client)
    }

    return (
        <main>
            <Modal active={changeModalActive} setActive={setChangeModalActive}>
                 <UpdateClientForm client={selectedClient} setModalActive={setChangeModalActive} active={changeModalActive}/>
            </Modal>
            <ClientsList onClick={handleRowClick}/>
        </main>
    )
}