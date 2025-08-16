import './ModalContent.css'
import './-Buttons/ModalContent-Buttons.css'
import {Input} from "../../../shared/ui/Input";
import {Button} from "../../../shared/ui/Button";
import DropdownMenu from "../../../shared/ui/Select/DropdownMenu.tsx";
import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addNewClient} from "../../../app/store/statsSlice.ts";
import {addClient} from '../api/addClient.ts';

const groups: string[] = ['Прохожий', 'Клиент', 'Партнёр'] // Группы для DropdownMenu

/* Содержимое Modal для добавления клиента */
interface AddClientProps {
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddClientForm: React.FC<AddClientProps> = ({setModalActive}) => {
    const [data, setData] = useState({
        fullName: '',
        company: '',
        group: '',
        present: false
    })
    const dispatch = useDispatch()

    function checkCorrectData() {
        return data.fullName !== '' && data.company !== '' && data.group !== '';
    }

    function handleAddClient() {
        if (checkCorrectData()) {
            addClient(data).then(response => {
                if(response) {
                    dispatch(addNewClient(response.data))
                    setModalActive(false)
                }
            })
        } else {
            alert('Есть незаполненные поля!')
        }
    }

    const handleInputChange = (property: string, value: string | boolean) => {
        setData((prev) => ({
            ...prev,
            [property]: value,
        }));
    };

    return (
        <div className='ModalContent'>
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
                          value={'Выбрать'}
                          onClick={(value) => handleInputChange('group', value)}
            />
            <Input type={'checkbox'}
                   label={'Присутствие'}
                   checked={data.present}
                   onChange={(value) => {
                       handleInputChange('present', value)
                   }}
            />
            <div className='ModalContent-Buttons'>
                <Button tittle={'Добавить'}
                        type={'Success'}
                        action={() => {
                            handleAddClient()
                        }}
                />
                <Button tittle={'Закрыть'}
                        type={'Danger'}
                        action={() => {
                            setModalActive(false)
                        }}
                />
            </div>
        </div>
    )
}