import axios from "axios";
import type {IClient} from "../model/clientType.ts";
import {baseURL} from "../../../shared/config";

async function getClients(params: string): Promise<IClient[]> {
    let clients: IClient[] = []
    try {
        const response = await axios.get<IClient[]>(`${baseURL}?${params}`)
        clients = response.data;
        console.log(clients)
        return clients
    } catch (error) {
        console.error('Ошибка при загрузке клиентов:', error)
    }
    return []
}

export {getClients}