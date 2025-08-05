import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Client} from "./types/clientTypes.ts";

interface StatsState {
    present: number,
    absent: number,
    clients: Client[],
}

const initialState: StatsState = {
    present: 0,
    absent: 0,
    clients: [] as Client[]
};

export const statsSlice = createSlice({
        name: 'stats',
        initialState,
        reducers: {
            setStats: (state, action: PayloadAction<{ clients: Client[], present: number, absent: number }>) => {
                state.clients = action.payload.clients
                state.present = action.payload.present;
                state.absent = action.payload.absent;

            },
            addNewClient: (state, action: PayloadAction<Client>) => {
                state.clients.push(action.payload)
                if (action.payload.present) {
                    state.present += 1
                } else {
                    state.absent += 1
                }
            },
            updateClient: (state, action: PayloadAction<{id: string, data: Partial<Client> }>) => {
                let previousVersionClient = state.clients.find(
                    (client) => client.id === action.payload.id)
                if(previousVersionClient) {
                    previousVersionClient = {...previousVersionClient, ...action.payload.data}
                    console.log(previousVersionClient)
                }
            }
        }
    }
)

export const {setStats, addNewClient, updateClient} = statsSlice.actions;
export default statsSlice.reducer;