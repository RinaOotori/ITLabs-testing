import axios from "axios"
import type {IClientData} from "../model/clientDataType.ts";
import {baseURL} from "../../../shared/config";

export async function addClient(data: IClientData) {
    try {
        return await axios.post(`${baseURL}/`, data, {headers: {'Content-Type': 'application/json'}})
    }
    catch (error) {
        console.log('Ошибка при добавлении клиента: ', error)
    }
}