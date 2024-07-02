import { User } from "./auth.types"

export interface DataState {
    departments: Department[]
}

export interface Department {
    id: string,
    category: string,
    name: string
}

export type Type = {
    id: string,
    name: string
}