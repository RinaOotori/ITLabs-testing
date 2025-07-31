import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    present: 0,
    absent: 0
};

export const statsSlice = createSlice({
        name: 'stats',
        initialState,
        reducers: {
            setStats: (state, action) => {
                state.present = action.payload.present;
                state.absent = action.payload.absent;
            }
        }
    }
)

export const {setStats} = statsSlice.actions;
export default statsSlice.reducer;