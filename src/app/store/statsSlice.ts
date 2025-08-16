import { createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {IClient} from "../../entities/client";

/* Хранилище актуальных данных */
interface StatsState {
    present: number,
    absent: number,
    clients: IClient[],
    filter: { searchQuery: string, presence: string }
}

const initialState: StatsState = {
    present: 0,
    absent: 0,
    clients: [] as IClient[],
    filter: {searchQuery: '', presence: ''}
};

export const statsSlice = createSlice({
        name: 'stats',
        initialState,
        reducers: {
            setStats: (state, action: PayloadAction<{ clients: IClient[] }>) => {
                state.clients = action.payload.clients
                state.present = state.clients.filter((client) => client.present).length
                state.absent = state.clients.filter((client) => !client.present).length
            },
            addNewClient: (state, action: PayloadAction<IClient>) => {
                state.clients.push(action.payload)
                if (action.payload.present) {
                    state.present += 1
                } else {
                    state.absent += 1
                }
            },
            updateClientStore: (state, action: PayloadAction<{ id: string, data: Partial<IClient> }>) => {
                const {id, data} = action.payload;
                state.clients = state.clients.map(client =>
                    client.id === id ? {...client, ...data} : client
                );
            },
            deleteClientStore: (state, action: PayloadAction<string>) => {
                state.clients = state.clients.filter((client) => client.id !== action.payload)
            },
            setFilter: (state, action: PayloadAction<{ searchQuery: string, presence: string }>) => {
                state.filter.searchQuery = action.payload.searchQuery
                state.filter.presence = action.payload.presence
            }
        }
    }
)

export const {setStats, addNewClient, updateClientStore, deleteClientStore, setFilter} = statsSlice.actions;
export default statsSlice.reducer;