import { PayloadAction } from "@reduxjs/toolkit";
import { constants } from "../../../../../utilities/store.config";

const initialState = {
    loading: true,
    printers: []
}

const { printer } = constants

export default function printerReducer(state=initialState, action: PayloadAction){
    
    const { type, payload } = action

    switch(type){
        case printer.GET_DEPARTMENT_PRINTERS: {
            return {
                ...state,
                loading: true
            }
        } 
        case printer.GET_DEPARTMENT_PRINTERS_SUCCESS: {
            return{
                ...state,
                loading: false,
                printers: payload
            }
        } 
        case printer.GET_DEPARTMENT_PRINTERS_FAILURE : {
            return {
                ...state,
                loading: false,
                printers: []
            }
        } 
        case printer.GET_ALL_PRINTERS: {
            return {
                ...state,
                loading: true
            }
        } 
        case printer.GET_ALL_PRINTERS_SUCCESS: {
            return{
                ...state,
                loading: false,
                printers: payload
            }
        } 
        case printer.GET_ALL_PRINTERS_FAILURE : {
            return {
                ...state,
                loading: false,
                printers: []
            }
        } 
        default: return state
    }
}