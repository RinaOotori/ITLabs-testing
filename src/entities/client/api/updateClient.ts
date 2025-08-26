import axios from "axios";
import type {IClientData} from "../model/clientDataType.ts";
import {baseURL} from "../../../shared/config";

export async function updateClient(id: string, clientData: IClientData) {
    try {
        return await axios.put(`${baseURL}/` + id, clientData, {headers: {'Content-Type': 'application/json'}});
    } catch (error) {
        console.log('Ошибка при изменении клиента: ', error)
    }
}