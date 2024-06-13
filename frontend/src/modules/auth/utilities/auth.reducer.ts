import { PayloadAction } from "@reduxjs/toolkit"
import { constants } from "../../../utilities/store.config"
import { AuthState } from "./auth.models"

const initialState: AuthState = {
    loggedIn: false
}

export default function authReducer(state = initialState, action: PayloadAction) {

    const { type } = action

    switch(type){
        case constants.auth.REFRESH_TOKEN_SUCCESS:{
            return {
                ...state,
                loggedIn: true
            }
        }
        case constants.auth.REFRESH_TOKEN_FAILURE:{
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
        case constants.auth.REGISTER_SUCCESS: {   
            return {
                ...state,
                loggedIn: false
            }
        }
        case constants.auth.REGISTER_FAIL: {   
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
        
        default: return state
    }

}