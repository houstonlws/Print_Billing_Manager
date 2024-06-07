import { PayloadAction } from "@reduxjs/toolkit"
import { constants } from "../../config/store.config"
import { AuthState } from "../../models/state.model"

const initialState: AuthState = {
    loggedIn: false
}

export default function authReducer(state = initialState, action: PayloadAction) {

    const { type, payload } = action

    switch(type){
        case constants.auth.REGISTER_SUCCESS: {   
            return {
                ...state,
                loggedIn: true
            }
        }
        case constants.auth.REGISTER_FAIL: {   
            return {
                ...state,
                loggedIn: false
            }
        }
        case constants.auth.LOGIN_SUCCESS: { 
            return {
                ...state,
                loggedIn: true
            }
        }
        case constants.auth.LOGIN_FAIL: {   
            return {
                ...state,
                loggedIn: false
            }
        }
        case constants.auth.LOGOUT: {   
            return {
                ...state,
                loggedIn: false
            }
        }
        case constants.auth.INITIALIZE_AUTH_SUCCESS:{
            return {
                ...state,
                loggedIn: true
            }
        }
        case constants.auth.INITIALIZE_AUTH_FAILURE:{
            return {
                ...state,
                loggedIn: false
            }
        }
        default: return state
    }

}