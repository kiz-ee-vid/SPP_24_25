export interface Constraints {
    [name:string]: string
}

export interface ValidationError {
    property: string,
    constraints: Constraints
}

export interface IError {
    message: string,
    validationErrors: ValidationError[]
}