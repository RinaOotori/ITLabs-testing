import {configureStore} from "@reduxjs/toolkit";
import statsReduser from './statsSlice.ts';

export const store = configureStore(
    {
        reducer: {
            stats: statsReduser
        }
    }
)

export type RootState = ReturnType<typeof store.getState>;