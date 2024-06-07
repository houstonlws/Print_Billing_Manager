import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    bills: []
}

export default function billingReducer(state=initialState, action: PayloadAction){
    
    const { type, payload } = action

    switch(type){
        
        default: return state
    }
}