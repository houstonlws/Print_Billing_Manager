import { Dispatch } from "redux";
import DataService from "../../services/data.service";
import { CONSTANTS } from "../constants";

const { GET_DEPARTMENTS_SUCCESS, GET_USER_DATA_FAIL, LOGOUT } = CONSTANTS;

export const getDepartments = () => async (dispatch: Dispatch) => {
  try {
    const result = await DataService.getDepartments();
    dispatch({ type: GET_DEPARTMENTS_SUCCESS, payload: result });
  } catch (error) {
    dispatch({ type: GET_USER_DATA_FAIL });
    dispatch({ type: LOGOUT });
  }
};
