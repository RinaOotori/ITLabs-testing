import './Home.css'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setFilter, setStats} from "../../../app/store/statsSlice.ts";
import type {IClient} from "../../../entities/client";
import type {RootState} from "../../../app/store/store.ts";
import {Modal} from "../../../widgets/Modal";
import UpdateClient from "../../../components/Modal/UpdateClient.tsx";
import {getClients} from "../../../entities/client";

/* Начальная страница */
export function Home() {
    const dispatch = useDispatch();
    const [isInitialized, setIsInitialized] = useState(false); // Проверка инициализации для получения URL
    const [changeModalActive, setChangeModalActive] = useState(false)
    const [selectedClient, setSelectedClient] = useState<IClient>({
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
            const fetchClients = async () => {
                const params = new URLSearchParams({'fullName_like': filters.searchQuery});
                if (filters.presence !== '') {
                    params.append('present', filters.presence);
                }
                const clients = await getClients(params.toString());
                dispatch(setStats({clients}));
                window.history.pushState({}, '', `?${params.toString()}`);
            };

            fetchClients().then();
        }
    }, [dispatch, filters.presence, filters.searchQuery, isInitialized]);

    const handleRowClick = (client: IClient) => {
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