import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

export const isSignedIn = createSlice({
    name: 'signingIn',
    initialState,
    reducers: {
        SIGN_IN: (state)=>{
            state.value = true;
        },
        SIGN_OUT: (state)=>{
            state.value = false;
        }
    }
})

export const {SIGN_IN, SIGN_OUT} = isSignedIn.actions;
export default isSignedIn.reducer;