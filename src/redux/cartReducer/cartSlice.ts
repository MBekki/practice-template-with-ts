import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { ProductType } from '../../interfaces';

interface cartState {
    carts: ProductType[];
}

const initialState: cartState = {
    carts: [],
};

export const cartSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        addCart: (state, action: PayloadAction<ProductType>) => {
            const isExistProduct = state.carts.find(
                elem => elem.id === action.payload.id
            );
            if (isExistProduct) {
                const updateData = state.carts.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        };
                    }
                    return item;
                });
                state.carts = updateData;
            } else {
                const data = [
                    ...state.carts,
                    { ...action.payload, quantity: 1 },
                ];
                state.carts = data;
            }
        },
        deleteItem: (state, action: PayloadAction<number>) => {
            const updateData = state.carts.filter(
                item => item.id !== action.payload
            );
            state.carts = updateData;
        },
        increment: (state, action: PayloadAction<number>) => {
            const updateData = state.carts.map(item => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });
            state.carts = updateData;
        },
        decrement: (state, action: PayloadAction<number>) => {
            const isExistProduct = state.carts.find(
                item => item.id === action.payload
            );
            if (isExistProduct?.quantity === 1) {
                const updateData = state.carts.filter(
                    item => item.id !== action.payload
                );
                state.carts = updateData;
            } else {
                const updateData = state.carts.map(item => {
                    if (item.id === action.payload) {
                        return {
                            ...item,
                            quantity: item.quantity - 1,
                        };
                    }
                    return item;
                });
                state.carts = updateData;
            }
        },
    },
});

export const { addCart, deleteItem, increment, decrement } = cartSlice.actions;

export const selectCarts = (state: RootState) => state.carts.carts;
export default cartSlice.reducer;
