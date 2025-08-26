import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {type IClient} from "../../entities/client";

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

function isMatchesFilters(state: StatsState, fullName: string, present: boolean | string) {
    return !!((((present == 'true' || present == true) && state.filter.presence == 'true') || state.filter.presence == '' || ((present == 'false' || present == false) && state.filter.presence == 'false')) && (fullName.match(state.filter.searchQuery)));
}

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
                console.log(state.filter.presence)
                console.log(action.payload.present)
                if (isMatchesFilters(state, action.payload.fullName, action.payload.present)) {
                    state.clients.push(action.payload)
                    if (action.payload.present) {
                        state.present += 1
                    } else {
                        state.absent += 1
                    }
                }
            },
            updateClientStore: (state, action: PayloadAction<{ id: string; data: Partial<IClient> }>) => {
                const {id, data} = action.payload
                const index = state.clients.findIndex(client => client.id === id)

                if (index !== -1) {
                    const client = state.clients[index]
                    const fullName = data.fullName ?? client.fullName
                    const present = data.present ?? client.present

                    if (isMatchesFilters(state, fullName, present)) {
                        if (client.present !== present) {
                            if (present) {
                                state.present += 1
                                state.absent -= 1
                            } else {
                                state.present -= 1
                                state.absent += 1
                            }
                        }
                        state.clients[index] = {...client, ...data}
                    } else {
                        state.clients = state.clients.filter(client => client.id !== id)
                        if (client.present) {
                            state.present -= 1
                        } else {
                            state.absent -= 1
                        }
                    }
                }
            },
            deleteClientStore: (state, action: PayloadAction<IClient>) => {
                state.clients = state.clients.filter((client) => client.id !== action.payload.id)
                if (action.payload.present) {
                    state.present -= 1
                } else {
                    state.absent -= 1
                }
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