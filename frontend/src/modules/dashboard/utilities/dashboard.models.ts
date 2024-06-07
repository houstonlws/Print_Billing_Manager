import { PrinterState } from '../modules/printers/printers.module'
import { ProfileState } from '../modules/profile/utilities/profile.reducer'

export { User } from '../../auth/utilities/auth.models'

export interface DashboardState {
    billing: null | void,
    maintenance: null | void,
    navigation: null | void,
    notifications: null | void,
    printer: PrinterState
    profile: ProfileState | null | void,
    tracking: null | void
}