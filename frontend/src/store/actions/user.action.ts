import { constants } from "../../config/store.config"
import { Dispatch } from "redux"
import UserService from "../../services/user.service"

export const getUserData = (userId:number) => async (dispatch: Dispatch) => {
    return await UserService.getUserData().then((res) =>{
        console.log('got data', res)
        dispatch({ type: constants.user.GET_USER_DATA_SUCCESS, payload: res.data })
    })
   .catch (err => {
        console.log('didnt get data', err)
        dispatch({ type: constants.user.GET_USER_DATA_FAIL })
    })
}