import './Home.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setStats} from "../statsSlice.ts";
import type {Client} from "../types/clientTypes.ts";

export default function Home() {
    const [clients, setClients] = useState<Client[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get<Client[]>('http://localhost:3000/visitors')
            .then(data => {
                    setClients(data.data);
                    const present = data.data.filter(client => client.present).length;
                    const absent = data.data.filter(client => !client.present).length;
                    dispatch(setStats({present, absent}));
                }
            )
    }, [dispatch])
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