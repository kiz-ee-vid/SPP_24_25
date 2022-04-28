export interface CreateTodoRequest {
    description: string,
    deadline: Date,
    file?: File | null
}

export interface UpdateTodoRequest {
    description?: string,
    deadline?: Date,
    completed?: boolean,
    file?: File | null
}

export type SortDirection = "asc" | "desc";

export interface SortParams {
    field?: string,
    direction?: SortDirection
}

export interface Filters {
    filterQuery?: string,
    showInProgress?: boolean,
    showCompleted?: boolean,
    showOverdue?: boolean
}

export interface GetTodosRequest {
    limit: number,
    page: number,
    filters?: Filters,
    sortParams?: SortParams
}