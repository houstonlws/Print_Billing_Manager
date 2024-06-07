import { constants } from "../../../utilities/store.config"
import { Dispatch } from "redux"

export const logout = () => (dispatch: Dispatch) => {
    console.log('logging out')
    document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    dispatch({type: constants.auth.LOGOUT})
}

