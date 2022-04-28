export interface LoginRequest {
    email: string,
    password: string
}

export interface RegistrationRequest {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
}