import { constants } from "../../../utilities/store.config"
import { Dispatch } from "redux"
import AuthService from "./auth.service"

export const register = (email:string, password:string) => async (dispatch:Dispatch) => {
    return await AuthService.register(email, password)
    .then((response:any) => {
        dispatch({type: constants.auth.REGISTER_SUCCESS})        
        return Promise.resolve(response)
    }, (error:any) => {
        dispatch({type: constants.auth.REGISTER_FAIL})
        return Promise.reject(error)
    })
}

export const login = (email:string, password:string) => async (dispatch: Dispatch) => {
    try {
        await AuthService.login(email, password)
        dispatch({ type: constants.auth.LOGIN_SUCCESS})
        window.location.assign('/')
    } catch (error) {
        dispatch({ type: constants.auth.LOGIN_FAIL })
    }
}

export const refreshToken = () => {
    return async (dispatch: Dispatch) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; refreshToken=`);
        if (parts.length === 2) {
            try {
                const data = await AuthService.refreshToken()
                if(data) {
                    dispatch({type: constants.auth.REFRESH_TOKEN_SUCCESS});
                }
                else {
                    dispatch({ type:constants.auth.REFRESH_TOKEN_FAILURE});
                }
            } catch (error) {
                dispatch({ type: constants.auth.REFRESH_TOKEN_FAILURE});
            }
        }
    };
};