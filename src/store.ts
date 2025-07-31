import {configureStore} from "@reduxjs/toolkit";
import statsReduser from './statsSlice';

export const store = configureStore(
    {
        reducer: {
            stats: statsReduser
        }
    }
)

export type RootState = ReturnType<typeof store.getState>;