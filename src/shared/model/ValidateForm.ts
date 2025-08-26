import type {IClientData} from "../../entities/client";

export interface ValidationErrors {
    [key: string]: string;
}

export function validateForm(data: IClientData): ValidationErrors {
    const newErrors: ValidationErrors = {}
    if (!data.fullName.trim()) newErrors.fullName = 'Поле ФИО обязательно'
    if (!data.company.trim()) newErrors.company = 'Поле Компания обязательно'
    if (!data.group.trim() || data.group === 'Выбрать') newErrors.group = 'Поле Группа обязательно'

    return newErrors
}