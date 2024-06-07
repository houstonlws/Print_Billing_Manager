import { Dispatch } from "redux"
import ProfileService from "./profile.service"
import { constants } from "../../../../../utilities/store.config"

export const getUserData = () => async (dispatch: Dispatch) => {
    try {      
        const result = await ProfileService.getUserData()
        dispatch({ type: constants.auth.GET_USER_DATA_SUCCESS, payload: result?.data })
    } catch (error) {
        console.log('didnt get data', error)
        dispatch({ type: constants.auth.GET_USER_DATA_FAIL })
    }
}

export const getDepartments = () => async (dispatch: Dispatch) => {
    try {      
        const result = await ProfileService.getDepartments()
        dispatch({ type: constants.profile.GET_DEPARTMENTS_SUCCESS,  payload: result })
    } catch (error) {
        console.log('didnt get data', error)
        dispatch({ type: constants.auth.GET_USER_DATA_FAIL })
    }
}