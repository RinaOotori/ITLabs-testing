import './Home.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setFilter, setStats} from "../statsSlice.ts";
import type {Client} from "../types/clientTypes.ts";
import type {RootState} from "../store.ts";
import Modal from "../components/Modal/Modal.tsx";
import UpdateClient from "../components/Modal/UpdateClient.tsx";
import {API_BASE_URL, VISITORS_ENDPOINT} from "../config.ts";

/* Начальная страница */
export default function Home() {
    const dispatch = useDispatch();
    const [isInitialized, setIsInitialized] = useState(false); // Проверка инициализации для получения URL
    const [changeModalActive, setChangeModalActive] = useState(false)
    const [selectedClient, setSelectedClient] = useState<Client>({
        present: false,
        company: '',
        fullName: '',
        group: '',
        id: ''
    })
    const {clients} = useSelector((state: RootState) => ({clients: state.stats.clients}));
    const filters = useSelector((state: RootState) => state.stats.filter)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const initSearchQuery = params.get('fullName_like') || ''
        const initPresence = params.get('present') || ''
        dispatch(setFilter({searchQuery: initSearchQuery, presence: initPresence})); // Установка фильтров при перезагрузке страницы
        setIsInitialized(true)
    }, [dispatch]);

    useEffect(() => {
        if (isInitialized) {
            const params = new URLSearchParams({'fullName_like': filters.searchQuery})
            if (filters.presence !== '') {
                params.append('present', filters.presence)
            }
            axios
                .get<Client[]>(`${API_BASE_URL}${VISITORS_ENDPOINT}?${params.toString()}`)
                .then((data) => {
                    const clientsData = data.data;
                    dispatch(setStats({clients: clientsData}));
                    window.history.pushState({}, '', `?${params.toString()}`)
                })
                .catch((error) => console.error('Ошибка при загрузке клиентов:', error));
        }
    }, [dispatch, filters.presence, filters.searchQuery, isInitialized]);

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
                            <tr onClick={() => {
                                handleRowClick(client)
                            }}>
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