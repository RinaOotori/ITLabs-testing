import type {IClient, IClientData} from "../../../entities/client";

export function fillClientFields(client: IClient): IClientData {
    return {
        fullName: client.fullName,
        company: client.company,
        group: client.group,
        present: client.present
    }
}