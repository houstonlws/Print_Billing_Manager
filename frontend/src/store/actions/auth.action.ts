import { constants } from "../../config/store.config"
import { Dispatch } from "redux"
import AuthService from "../../services/auth.service"

export const register = (username:string, email:string, password:string) => (dispatch:Dispatch) => {
    return AuthService.register(username, email, password)
    .then((response:any) => {
        dispatch({type: constants.auth.REGISTER_SUCCESS})        
        return Promise.resolve(response)
    }, (error:any) => {
        dispatch({type: constants.auth.REGISTER_FAIL})
        return Promise.reject(error)
    })
}

export const login = (username:string, password:string) => (dispatch: Dispatch) => {
    return AuthService.login(username, password)
    .then((response: any) => {
        console.log('login success',response)
        dispatch({type: constants.auth.LOGIN_SUCCESS})
        return Promise.resolve(response)
    }, (error: any) => {
        console.log('problem logging in',error)
        dispatch({type: constants.auth.LOGIN_FAIL})
        return Promise.reject(error)
    })
}

export const logout = () => (dispatch: Dispatch) => {
    document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    dispatch({type: constants.user.CLEAR_USER})
    dispatch({type: constants.auth.LOGOUT})
}

export const authInitializeAsync = () => {
    return async (dispatch: Dispatch) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; refreshToken=`);
        if (parts.length === 2) {
            try {
                const data = await AuthService.refreshToken()
                if(data) {
                    console.log('token valid')
                    dispatch({type: constants.auth.INITIALIZE_AUTH_SUCCESS});
                }
                else {
                    dispatch({ type:constants.auth.INITIALIZE_AUTH_FAILURE});
                }
            } catch (error) {
                dispatch({ type: constants.auth.INITIALIZE_AUTH_FAILURE});
            }
        }
    };
  };