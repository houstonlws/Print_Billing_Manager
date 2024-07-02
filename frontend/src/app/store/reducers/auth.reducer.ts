import { PayloadAction } from "@reduxjs/toolkit"
import { CONSTANTS } from "../../utilities/constants"
import { AuthState } from '../../types/auth.types'

const { 
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAIL,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAILURE,
    UPDATE_USER_DATA_FAILURE,
    UPDATE_USER_DATA_SUCCESS
} = CONSTANTS

const initialState: AuthState = {
    loggedIn: false,
    user: null,
    notifications: [],
    updatedDataStatus: null
}

export const authReducer = (state = initialState, action: PayloadAction) => {

    const { type, payload } = action

    switch(type){
        case REFRESH_TOKEN_SUCCESS:{
            return {
                ...state,
                loggedIn: true
            }
        }
        case REFRESH_TOKEN_FAILURE:{
            return {
                ...state,
                loggedIn: false
            }
        }
        case LOGIN_SUCCESS: { 
            return {
                ...state,
                loggedIn: true
            }
        }
        case LOGIN_FAIL: {   
            return {
                ...state,
                loggedIn: false
            }
        }
        case REGISTER_SUCCESS: {   
            return {
                ...state,
                loggedIn: false
            }
        }
        case REGISTER_FAIL: {   
            return {
                ...state,
                loggedIn: false
            }
        }
        case LOGOUT: {   
            return {
                ...state,
                loggedIn: false,
                user: null
            }
        }
        case GET_USER_DATA_SUCCESS: {
            return {
                ...state,
                loggedIn: true,
                user: payload
            }
        }
        case GET_USER_DATA_FAIL: {
            return {
                ...state,
                loggedIn: false,
                user: null
            }
        }
        case GET_NOTIFICATIONS_SUCCESS : {
            return {
                ...state,
                notifications: payload
            }
        }
        case GET_NOTIFICATIONS_FAILURE : {
            return {
                ...state,
                notifications: []
            }
        }
        case UPDATE_USER_DATA_SUCCESS: {
            return {
                ...state,
                updatedDataStatus: 'success'
            }
        }
        case UPDATE_USER_DATA_FAILURE: {
            return {
                ...state,
                updatedDataStatus: 'failure'
            }
        }
        default: return state
    }

}