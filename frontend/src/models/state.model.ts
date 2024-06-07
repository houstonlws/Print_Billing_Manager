import { User } from "./user.model";

export interface UserState {
    user: User | null
}

export interface AuthState {
    loggedIn: boolean
}

export interface AppState {
    user: UserState,
    auth: AuthState
}