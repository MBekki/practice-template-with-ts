import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../cartReducer/cartSlice';

export const store = configureStore({
    reducer: {
        carts: cartSlice,
    },
});

export type AppStore = typeof store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = AppStore['dispatch'];
