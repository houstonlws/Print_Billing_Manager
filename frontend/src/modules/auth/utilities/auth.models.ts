export interface User {
    id: number,
    email: string,
    type?: string,
    firstName?: string,
    lastName?: string,
    department?: string,
    phone?: string
}

export interface AuthState {
    loggedIn: boolean
}