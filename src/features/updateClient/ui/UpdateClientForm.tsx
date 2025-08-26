import {Input} from "../../../shared/ui/common/Input";
import {Button} from "../../../shared/ui/common/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {updateClientStore, deleteClientStore} from "../../../app/store/statsSlice.ts";
import {deleteClient, updateClient} from "../../../entities/client";
import './-ContentButtons/Modal-ContentButtons.css'
import type {UpdateClientProps} from "../model/UpdateClientProps.ts";
import {fillClientFields} from "../model/fillClientFields.ts";
import {groups} from "../../../shared/model";
import {Select} from "../../../shared/ui/common/Select";
import {validateForm, type ValidationErrors} from "../../../shared/model";

/* Содержимое для Modals при изменении клиена */
export const UpdateClientForm: React.FC<UpdateClientProps> = ({client, setModalActive, active}) => {
    const [data, setData] = useState(fillClientFields(client))
    const dispatch = useDispatch()
    const [errors, setErrors] = useState<ValidationErrors>({})

    useEffect(() => {
        setData(fillClientFields(client))
    }, [client])

    useEffect(() => {
        if (!active) {
            setData(fillClientFields(client))
            setErrors({})
        }
    }, [active, client])

    async function handleUpdateClient() {
        const newErrors = validateForm(data)
        if(Object.keys(newErrors).length == 0) {
            updateClient(client.id, data).then(response => {
                if (response) {
                    dispatch(updateClientStore({id: client.id, data: response.data}))
                    setModalActive(false)
                }
            })
        }
        else {
            setErrors(newErrors)
        }
    }

    async function handleDeleteClient() {
        deleteClient(client.id).then(() => {
            dispatch(deleteClientStore(client))
            setModalActive(false)
        })
    }

    const handleInputChange = (property: string, value: string | boolean) => {
        setData((prev) => ({
            ...prev,
            [property]: value,
        }))
        setErrors((prev) => ({...prev, [property]: ''}))
    };

    return (
        <form className={'Modal-Form'}>
            <Input type={'text'}
                   label={'ФИО'}
                   value={data.fullName}
                   errorMessage={errors.fullName}
                   onChange={(value) => handleInputChange('fullName', value)}
            />
            <Input type={'text'}
                   label={'Компания'}
                   value={data.company}
                   errorMessage={errors.company}
                   onChange={(value) => handleInputChange('company', value)}
            />
            <Select items={groups}
                    label={'Группа'}
                    errorMessage={errors.group}
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
            <div className='Modal-ContentButtons'>
                <Button tittle={'Сохранить'}
                        style={'success'}
                        action={() => handleUpdateClient()}
                />
                <Button tittle={'Удалить'}
                        style={'danger'}
                        action={() => {
                            handleDeleteClient().then()
                        }}
                />
                <Button tittle={'Закрыть'}
                        style={'info'}
                        action={() => {
                            setModalActive(false)
                        }}
                />
            </div>
        </form>
    )
}