import { Dispatch } from "redux"
import { CONSTANTS } from "../../utilities/constants"
import AuthService from '../../services/auth.service'
import { User } from "../../types/auth.types"

const { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAIL,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILURE,
    CLEAR_PERSIST,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAILURE
} = CONSTANTS

export const register = (email:string, password:string) => async (dispatch:Dispatch) => {
    return await AuthService.register(email, password)
    .then((response:any) => {
        dispatch({type: REGISTER_SUCCESS})        
        return Promise.resolve(response)
    }, (error:any) => {
        dispatch({type: REGISTER_FAIL})
        return Promise.reject(error)
    })
}

export const login = (email:string, password:string) => async (dispatch: Dispatch) => {
    try {
        await AuthService.login(email, password)
        dispatch({ type: LOGIN_SUCCESS})
        window.location.assign('/')
    } catch (error) {
        dispatch({ type: LOGIN_FAIL })
    }
}

export const logout = () => (dispatch: Dispatch) => {
    console.log('logging out')
    document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    dispatch({type: CLEAR_PERSIST})
    dispatch({type: LOGOUT})
}

export const refreshToken = () => async (dispatch: Dispatch) => {
        try {
            const token = getCookie('refreshToken')
            if (token) {
                const tokenValid = await AuthService.refreshToken()
                if(tokenValid){
                    dispatch({type: REFRESH_TOKEN_SUCCESS});
                }
                else {
                    clearCookie('refreshToken')
                    dispatch({ type: REFRESH_TOKEN_FAILURE});
                }
            }
            else {
                dispatch({ type: REFRESH_TOKEN_FAILURE});
            }
        } catch (error) {
            dispatch({ type: REFRESH_TOKEN_FAILURE});
        }
        
    };


export const getUserData = () => async (dispatch: Dispatch) => {
    try {      
        const result = await AuthService.getUserData()
        if(result?.status === 200) {
            dispatch({ type: GET_USER_DATA_SUCCESS, payload: result?.data })
        }else {
            dispatch({ type: GET_USER_DATA_FAIL })
        }
    } catch (error) {
        dispatch({ type: GET_USER_DATA_FAIL })
    }
}

export const updateUserData = (data: User) => async (dispatch: Dispatch) => {
    try {      
        const result = await AuthService.updateUserData(data)
        dispatch({ type: UPDATE_USER_DATA_SUCCESS, payload: result })
    } catch (error) {
        console.log('didnt get data', error)
        dispatch({ type: UPDATE_USER_DATA_FAILURE })
    }
}

export const getNotifications = () => async (dispatch: Dispatch) => {
    try {      
        const result = await AuthService.getNotifications()
        dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: result })
    } catch (error) {
        dispatch({ type: GET_NOTIFICATIONS_FAILURE })
    }
}

const clearCookie = (name:string) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
}

const getCookie = (name:string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`)!
    if (parts.length === 2){ 
        const cookieVal = parts.pop()?.split(';').shift();
        return cookieVal ? cookieVal : null;
    }
    return null;
  }