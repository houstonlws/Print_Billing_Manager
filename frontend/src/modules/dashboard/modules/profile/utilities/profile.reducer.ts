import { PayloadAction } from "@reduxjs/toolkit"
import { constants } from "../../../../../utilities/store.config"
import { Department, User } from "./profile.models"

export interface ProfileState {
    user: User | null | void,
    departments?: Department[]
}

const initialState: ProfileState = {
    user: null
}

export default function profileReducer(state = initialState, action: PayloadAction) {

    const { type, payload } = action

    switch(type){
        case constants.auth.GET_USER_DATA_SUCCESS: {
            return {
                ...state,
                user: payload
            }
        }
        case constants.auth.GET_USER_DATA_FAIL: {
            return {
                ...state,
                user: null
            }
        }
        case constants.auth.LOGOUT: {
            return {
                ...state,
                user: null
            }
        }
        case constants.profile.GET_DEPARTMENTS: {
            return {
                ...state,
                departments: []
            }
        }
        case constants.profile.GET_DEPARTMENTS_SUCCESS: {
            return {
                ...state,
                departments: payload
            }
        }
        case constants.profile.GET_DEPARTMENTS_FAILURE: {
            return {
                ...state,
                departments: []
            }
        }
        default: return state
    }
}