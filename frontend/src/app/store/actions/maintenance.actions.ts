import { Dispatch } from "redux";
import MaintenanceService from "../../services/maintenenance.servic";
import { CONSTANTS } from "../../utilities/constants";
import { MaintenanceRequest } from "../../types/maintenance.types";

const {
    GET_MAINTENANCE_REQUESTS_SUCCESS,
    ADD_MAINTENANCE_REQUEST_SUCCESS,
    GET_MAINTENANCE_REQUESTS_FAILURE,
    ADD_MAINTENANCE_REQUEST_FAILURE,
    LOGOUT
} = CONSTANTS

export const getMaintenanceRequests = (printers: string[]) => async (dispatch: Dispatch) => {
    try {
        const requests = await MaintenanceService.getMaintenanceRequests(printers)
        dispatch({type: GET_MAINTENANCE_REQUESTS_SUCCESS, payload: requests})
    } catch (error) {
        dispatch({type: GET_MAINTENANCE_REQUESTS_FAILURE})
        dispatch({type: LOGOUT})
    }
}

export const addMaintenanceRequest = (request: MaintenanceRequest) => async (dispatch: Dispatch)  => {
    try {
        const result = await MaintenanceService.addMaintenanceRequest(request)
        dispatch({type: ADD_MAINTENANCE_REQUEST_SUCCESS})
    } catch (error) {
        dispatch({type: ADD_MAINTENANCE_REQUEST_FAILURE})
    }
}