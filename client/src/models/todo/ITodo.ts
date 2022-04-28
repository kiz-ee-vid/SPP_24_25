export interface ITodo {
    todoId: string,
    description: string,
    deadline: Date,
    completed: boolean,
    filepath?: string
}
