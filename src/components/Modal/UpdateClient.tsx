import { Input } from "../../shared/ui/Input";
import DropdownMenu from "../../shared/ui/Select/DropdownMenu.tsx";
import {Button} from "../../shared/ui/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {updateClientStore, deleteClientStore} from "../../app/store/statsSlice.ts";
import type { IClient } from "../../entities/client";
import {API_BASE_URL} from "../../shared/config/config.ts";

const groups: string[] = ['Прохожий', 'Клиент', 'Партнёр'] // Группы для DropdownMenu

/* Содержимое для Modals при изменении клиена */
interface ChangeClientProps {
    client: IClient,
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateClient: React.FC<ChangeClientProps> = ({client, setModalActive}) => {
    const [data, setData] = useState({
        fullName: client.fullName,
        company: client.company,
        group: client.group,
        present: client.present
    })
    const dispatch = useDispatch()

    useEffect(() => {
        setData({
            fullName: client.fullName,
            company: client.company,
            group: client.group,
            present: client.present
        })
    }, [client])

    function checkCorrectData() {
        return data.fullName !== '' && data.company !== '' && data.group !== '';
    }

    async function updateClient() {
        if (checkCorrectData()) {
            try {
                await axios.put(`${API_BASE_URL}/` + client.id, data, {headers: {'Content-Type': 'application/json'}})
                    .then((response) => {
                        dispatch(updateClientStore({id: client.id, data: response.data}))
                        setModalActive(false)
                    })
            } catch (error) {
                console.log('Ошибка при изменении клиента: ', error)
            }
        } else {
            alert('Есть незаполненные поля!')
        }
    }

    async function deleteClient() {
        try {
            await axios.delete(`${API_BASE_URL}/` + client.id)
                .then(() => {
                    dispatch(deleteClientStore(client.id))
                    setModalActive(false)
                })
        } catch (error) {
            console.log('Ошибка при удалении клиента: ', error)
        }
    }

    const handleInputChange = (property: string, value: string | boolean) => {
        setData((prev) => ({
            ...prev,
            [property]: value,
        }));
    };

    return (
        <div className='modal_content_form'>
            <Input type={'text'}
                   label={'ФИО'}
                   value={data.fullName}
                   onChange={(value) => handleInputChange('fullName', value)}
            />
            <Input type={'text'}
                   label={'Компания'}
                   value={data.company}
                   onChange={(value) => handleInputChange('company', value)}
            />
            <DropdownMenu items={groups}
                          label={'Группа'}
                          value={data.group}
                          onClick={(value) => handleInputChange('group', value)}
            />
            <Input type={'checkbox'}
                   label={'Присутствие'}
                   checked={data.present}
                   onChange={(value) => {
                            handleInputChange('present', value)
                        }}
            />
            <div id='buttons'>
                <Button tittle={'Сохранить'}
                        type={'Success'}
                        action={() => {
                            updateClient().then()
                        }}
                />
                <Button tittle={'Удалить'}
                        type={'Danger'}
                        action={() => {
                            deleteClient().then()
                        }}
                />
                <Button tittle={'Закрыть'}
                        type={'Info'}
                        action={() => {
                            setModalActive(false)
                        }}
                />
            </div>
        </div>
    )
}

export default UpdateClient;