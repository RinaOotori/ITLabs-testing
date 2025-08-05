import './AddClient.css'
import InputField from "../Input/InputField.tsx";
import Button from "../Button/Button.tsx";
import DropdownMenu from "../Input/DropdownMenu.tsx";
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addNewClient} from "../../statsSlice.ts";

const groups: string[] = ['Прохожий', 'Клиент', 'Партнёр']

interface AddClientProps {
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

const AddClientFormComponent: React.FC<AddClientProps> = ({setModalActive}) => {
    const [data, setData] = useState({
        fullName: '',
        company: '',
        group: 'Прохожий',
        present: false
    })
    const dispatch = useDispatch()

    async function addClient() {
        try {
            await axios.post('http://localhost:3000/visitors', data, {headers: {'Content-Type': 'application/json'}})
                .then((response) => {
                    dispatch(addNewClient(response.data))
                    setModalActive(false)
                })
        } catch (error) {
            console.log('Ошибка при добавлении клиента: ', error)
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
            <InputField type={'text'}
                        label={'ФИО'}
                        required={true}
                        value={data.fullName}
                        onChange={(value) => handleInputChange('fullName', value)}
            />
            <InputField type={'text'}
                        label={'Компания'}
                        required={true}
                        value={data.company}
                        onChange={(value) => handleInputChange('company', value)}
            />
            <DropdownMenu items={groups}
                          label={'Группа'}
                          value={'Выбрать'}
                          onClick={(value) => handleInputChange('group', value)}
            />
            <InputField type={'checkbox'}
                        label={'Присутствие'}
                        required={false}
                        checked={data.present}
                        onChange={(value) => {
                            handleInputChange('present', value)
                        }}
            />
            <div id='buttons'>
                <Button tittle={'Добавить'}
                        type={'button'}
                        action={() => {
                            addClient()
                        }}
                />
                <Button tittle={'Закрыть'}
                        type={'button'}
                        action={() => {
                            setModalActive(false)
                        }}
                />
            </div>
        </div>
    )
}

export default AddClientFormComponent;