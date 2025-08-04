import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Client} from "./types/clientTypes.ts";

const initialState = {
    present: 0,
    absent: 0,
    clients: [] as Client[]
};

export const statsSlice = createSlice({
        name: 'stats',
        initialState,
        reducers: {
            setStats: (state, action: PayloadAction<{clients: Client[], present: number, absent: number}>) => {
                state.clients = action.payload.clients
                state.present = action.payload.present;
                state.absent = action.payload.absent;
                console.log(state.present, state.absent)
            },
            addNewClient: (state, action: PayloadAction<Client>) => {
                state.clients.push(action.payload)
                if(action.payload.present){
                    state.present += 1
                }
                else {
                    state.absent += 1
                }
            }
        }
    }
)

export const { setStats, addNewClient } = statsSlice.actions;
export default statsSlice.reducer;