import './Home.css'
import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setStats} from "../statsSlice.ts";
import type {Client} from "../types/clientTypes.ts";
import type {RootState} from "../store.ts";

export default function Home() {
    const dispatch = useDispatch();
    const clients = useSelector((state: RootState) => state.stats.clients);

    useEffect(() => {
        axios
            .get<Client[]>('http://localhost:3000/visitors')
            .then((data) => {
                const clientsData = data.data;
                console.log(clients)
                dispatch(setStats({
                    clients: clientsData, // Передаём весь массив клиентов
                    present: clientsData.filter((client) => client.present).length,
                    absent: clientsData.filter((client) => !client.present).length,
                }));
            })
            .catch((error) => console.error('Ошибка при загрузке клиентов:', error));
    }, [clients, dispatch]);
    return (
        <main>
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
                    clients.map(clients => {
                        return (
                            <tr>
                                <td>{clients['id']}</td>
                                <td>{clients['fullName']}</td>
                                <td>{clients['company']}</td>
                                <td>{clients['group']}</td>
                                <td>
                                    <div id={!clients['present'] ? 'absent' : 'present'}></div>
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