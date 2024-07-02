import { Dispatch } from "redux";
import MaintenanceService from "../../services/maintenenance.servic";
import { CONSTANTS } from "../../utilities/constants";
import { MaintenanceRequest } from "../../types/maintenance.types";

const {
    GET_MAINTENANCE_REQUESTS_SUCCESS,
    ADD_MAINTENANCE_REQUEST_SUCCESS
} = CONSTANTS

export const getMaintenanceRequests = (printers: string[]) => async (dispatch: Dispatch) => {
    const requests = await MaintenanceService.getMaintenanceRequests(printers)
    dispatch({type: GET_MAINTENANCE_REQUESTS_SUCCESS, payload: requests})
}

export const addMaintenanceRequest = (request: MaintenanceRequest) => async (dispatch: Dispatch)  => {
    const result = await MaintenanceService.addMaintenanceRequest(request)
    dispatch({type: ADD_MAINTENANCE_REQUEST_SUCCESS})
}