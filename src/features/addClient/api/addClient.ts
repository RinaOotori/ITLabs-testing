import axios from "axios"
import type {IClientData} from "../model/clientData"
import {API_BASE_URL} from "../../../shared/config/config"

export async function addClient(data: IClientData) {
    try {
        return await axios.post(`${API_BASE_URL}/`, data, {headers: {'Content-Type': 'application/json'}})
    }
    catch (error) {
        console.log('Ошибка при добавлении клиента: ', error)
    }
}