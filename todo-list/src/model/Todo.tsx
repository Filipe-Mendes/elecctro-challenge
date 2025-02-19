import STATE from "./state"

export interface Todo {
    id: number,
    state: STATE,
    description: string,
    createdAt: Date,
    completedAt?: Date,
    username?: string,
}
