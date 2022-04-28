import {IError} from "../models/IError";

export const convertError = (e: any): IError => {
    return {
        message: e[0].message,
        validationErrors: e[0].extensions.exception.validationErrors
    }
}