import './Home.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setStats} from "../statsSlice.ts";
import type {Client} from "../types/clientTypes.ts";
import type {RootState} from "../store.ts";
import Modal from "../components/Modal/Modal.tsx";
import UpdateClient from "../components/Modal/UpdateClient.tsx";

export default function Home() {
    const dispatch = useDispatch();
    const [changeModalActive, setChangeModalActive] = useState(false)
    const [selectedClient, setSelectedClient] = useState<Client>({present: false, company: '', fullName: '', group: '', id: ''})
    const {clients} = useSelector((state: RootState) => ({clients: state.stats.clients,}));

    useEffect(() => {
        axios
            .get<Client[]>('http://localhost:3000/visitors')
            .then((data) => {
                const clientsData = data.data;
                dispatch(setStats({
                    clients: clientsData, // Передаём весь массив клиентов
                    present: clientsData.filter((client) => client.present).length,
                    absent: clientsData.filter((client) => !client.present).length,
                }));
            })
            .catch((error) => console.error('Ошибка при загрузке клиентов:', error));
    }, [clients, dispatch]);

    const handleRowClick = (client: Client) => {
        setChangeModalActive(true)
        setSelectedClient(client)
    }
    return (
        <main>
            <Modal active={changeModalActive} setActive={setChangeModalActive}>
                <UpdateClient client={selectedClient} setModalActive={setChangeModalActive}/>
            </Modal>
            <table>
                <thead>
                <tr>
                    <th>Номер</th>
                    <th>ФИО</th>
                    <th>Компания</th>
                    <th>Группа</th>
                    <th className='present_cells'>Присутствие</th>
                </tr>
                </thead>
                <tbody>
                {
                    clients.map(client => {
                        return (
                            <tr onClick={() => {handleRowClick(client)}}>
                                <td>{client['id']}</td>
                                <td>{client['fullName']}</td>
                                <td>{client['company']}</td>
                                <td>{client['group']}</td>
                                <td>
                                    <div id={!client['present'] ? 'absent' : 'present'}></div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </main>
    )
}