import { PayloadAction } from "@reduxjs/toolkit"
import { CONSTANTS } from "../../utilities/constants"

const {
    GET_DEPARTMENTS,
    GET_DEPARTMENTS_SUCCESS,
    GET_DEPARTMENTS_FAILURE
} = CONSTANTS

const initialState = {
    departments: []
}

export const dataReducer = (state = initialState, action: PayloadAction) => {

    const { type, payload } = action

    switch(type){
        case GET_DEPARTMENTS: {
            return {
                ...state,
                departments: []
            }
        }
        case GET_DEPARTMENTS_SUCCESS: {
            return {
                ...state,
                departments: payload
            }
        }
        case GET_DEPARTMENTS_FAILURE: {
            return {
                ...state,
                departments: []
            }
        }
        
        default: return state
    }

}