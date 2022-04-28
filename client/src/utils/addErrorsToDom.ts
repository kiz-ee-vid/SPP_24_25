import {ValidationError} from "../models/IError";

export const addErrorsToDom = (errors?: ValidationError[]) => {
    if (errors) {
        errors.forEach(err => {
            const errorElement = document.getElementById(err.property);
            if (errorElement) {
                errorElement.innerText = Object.values(err.constraints)[0];
            }
        })
    }
}