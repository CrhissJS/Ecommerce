import { createSlice } from '@reduxjs/toolkit';

export const categorySelectedSlice = createSlice({
    name: 'categorySelected',
    initialState: 0,
    reducers: {
        setCategorySelected: (state, action) => {
            const categorySelected = action.payload
            return categorySelected
        }
    }
})

export const { setCategorySelected } = categorySelectedSlice.actions;

export default categorySelectedSlice.reducer;
