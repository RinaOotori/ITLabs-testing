export interface IClientData {
    fullName: string;
    company: string;
    group: string;
    present: boolean;
}

export const createEmptyIClientData = (): IClientData => ({
    fullName: '',
    company: '',
    group: 'Выбрать',
    present: false
})