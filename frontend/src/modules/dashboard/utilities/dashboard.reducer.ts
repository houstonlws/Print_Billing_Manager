import { combineReducers } from "@reduxjs/toolkit"
import billingReducer from "../modules/billing/utilities/billing.reducer"
import maintenanceReducer from "../modules/maintenance/utilities/maintenance.reducer"
import navigationReducer from "../modules/navigation/utilities/navigation.reducer"
import notificationReducer from "../modules/notifications/utilities/notification.reducer"
import printerReducer from "../modules/printers/utilities/printer.reducer"
import profileReducer from "../modules/profile/utilities/profile.reducer"
import trackingReducer from "../modules/tracking/utilities/tracking.reducer"

export default combineReducers({
    billing: billingReducer,
    maintenance: maintenanceReducer,
    navigation: navigationReducer,
    notifications: notificationReducer,
    printer: printerReducer,
    profile: profileReducer,
    tracking:trackingReducer
})



