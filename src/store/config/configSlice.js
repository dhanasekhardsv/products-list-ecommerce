import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dialogBoxOpen: false,
    prodResultsPage: 0
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
        },
        setProdResultsPage: (state, action) => {
            state.prodResultsPage = action.payload;
        }
    }
});

export const { openDialogBox, closeDialogBox, setProdResultsPage } = configSlice.actions;
export const configReducer = configSlice.reducer;