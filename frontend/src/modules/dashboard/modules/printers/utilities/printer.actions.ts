import { Dispatch } from "redux";
import PrintersService from "./printers.service";
import { constants } from "../../../../../utilities/store.config";

const { printer } = constants

export const getDepartmentPrinters = () => async (dispatch:Dispatch) => {
    try {
        const printers = await PrintersService.getDepartmentPrinters() 
        dispatch({type: printer.GET_DEPARTMENT_PRINTERS_SUCCESS, payload: printers})
    } catch (error) {
        dispatch({type: printer.GET_DEPARTMENT_PRINTERS_FAILURE})
    }
}

export const getAllPrinters = () => async (dispatch:Dispatch) => {
    try {
        const printers = await PrintersService.getAllPrinters() 
        dispatch({type: printer.GET_DEPARTMENT_PRINTERS_SUCCESS, payload: printers})
    } catch (error) {
        dispatch({type: printer.GET_DEPARTMENT_PRINTERS_FAILURE})
    }

}