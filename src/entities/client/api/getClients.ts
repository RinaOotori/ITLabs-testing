import axios from "axios";
import type {IClient} from "../model/clientType.ts";
import {API_BASE_URL} from "../../../shared/config/config.ts";

async function getClients(params: string): Promise<IClient[]> {
    let clients: IClient[] = []
    try {
        const response = await axios.get<IClient[]>(`${API_BASE_URL}?${params}`)
        clients = response.data;
        return clients
    } catch (error) {
        console.error('Ошибка при загрузке клиентов:', error)
    }
    return []
}

export {getClients}