import './-ContentButtons/Modal-ContentButtons.css'
import {Input} from "../../../shared/ui/common/Input";
import {Button} from "../../../shared/ui/common/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addNewClient} from "../../../app/store/statsSlice.ts";
import {addClient, createEmptyIClientData} from '../../../entities/client';
import type {AddClientProps} from "../model/AddClientProps.ts";
import {groups} from "../../../shared/model";
import './AddClientForm.css'
import {Select} from "../../../shared/ui/common/Select";
import {validateForm, type ValidationErrors} from "../../../shared/model";

/* Содержимое Modal для добавления клиента */
export const AddClientForm: React.FC<AddClientProps> = ({setModalActive, active}) => {
    const [data, setData] = useState(createEmptyIClientData)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        if (!active) {
            setData(createEmptyIClientData)
            setErrors({})
        }
    }, [active])

    function handleAddClient() {
        const newErrors = validateForm(data)
        if (Object.keys(newErrors).length === 0) {
            addClient(data).then(response => {
                if (response) {
                    dispatch(addNewClient(response.data))
                    setData(createEmptyIClientData)
                    setModalActive(false)
                }
            })
        } else {
            setErrors(newErrors)
        }
    }

    const handleInputChange = (property: string, value: string | boolean) => {
        setData((prev) => ({
            ...prev,
            [property]: value,
        }));
        setErrors((prev) => ({...prev, [property]: ''}));
    };

    return (
        <>
            <form className='Modal-Form'>
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
                        value={data.group}
                        errorMessage={errors.group}
                        onClick={(value) => handleInputChange('group', value)}
                />
                <Input type={'checkbox'}
                       label={'Присутствие'}
                       checked={data.present}
                       onChange={(value) => {
                           handleInputChange('present', value)
                       }}
                />
            </form>
            <div className='Modal-ContentButtons'>
                <Button tittle={'Добавить'}
                        style={'success'}
                        action={() => handleAddClient()}
                />
                <Button tittle={'Закрыть'}
                        style={'danger'}
                        action={() => {
                            setErrors({})
                            setModalActive(false)
                        }}
                />
            </div>
        </>
    )
}