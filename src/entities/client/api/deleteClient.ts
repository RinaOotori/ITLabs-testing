import axios from "axios";
import {baseURL} from "../../../shared/config";

export async function deleteClient(id: string){
    try {
        return await axios.delete(`${baseURL}/` + id)
    }
    catch (error) {
        console.log('Ошибка при удалении клиента: ', error)
    }
}