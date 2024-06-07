import { constants } from "../../config/store.config"
import { PayloadAction } from "@reduxjs/toolkit"
import { UserState } from "../../models/state.model"

const initialState: UserState = {
   user: null
}

export default function userReducer(state = initialState, action: PayloadAction) {
    const { type, payload } = action
    switch(type){
        case constants.user.GET_USER_DATA_SUCCESS: {
            return {
                ...state,
                user: payload
            }
        }
        case constants.user.GET_USER_DATA_FAIL: {
            return {
                ...state,
                user: null
            }
        }
        case constants.user.CLEAR_USER: {
            return {
                ...state,
                user: null
            }
        }
        default : return state
    }
}