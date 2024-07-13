import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dialogBoxOpen: false
}

const configSlice = createSlice({
    name: 'config',
    initialState: initialState,
    reducers: {
        openDialogBox: (state) => {
            state.dialogBoxOpen = true;
        },
        closeDialogBox: (state) => {
            state.dialogBoxOpen = false;
        }
    }
});

export const { openDialogBox, closeDialogBox } = configSlice.actions;
export const configReducer = configSlice.reducer;