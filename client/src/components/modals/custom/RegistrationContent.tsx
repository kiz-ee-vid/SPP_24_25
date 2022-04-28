import React, {ChangeEvent, useState} from "react";
import {RegistrationRequest} from "../../../models/user/AuthRequest";
import {useActions} from "../../../hooks/useActions";


const useRegistrationContent = () => {
    const {register} = useActions();

    const [userData, setUserData] = useState<RegistrationRequest>({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => {
            return {...prev, [event.target.name]: event.target.value}
        })
    }

    return {
        title: (<div className={"bg-info"}>
            <h3>Registration screen</h3>
            <p>Become a new user, its free!</p>
        </div>),
        body: (<div className={"control1"}>
            <div className="d-flex flex-column mb-3 bg-info">
                <label htmlFor="name" className="required col-form-label1">Name</label>
                <input className="form-control1 w-25" name="name" required
                       value={userData?.name}
                       onChange={(e) => onInputChangeHandler(e)}/>
                <div id="name" className="align-self-end text-danger pt-1">{}</div>
            </div>
            <div className="d-flex flex-column mb-3">
                <label htmlFor="email" className="required col-form-label1">Email</label>
                <input className="form-control1 w-25" name="email" required
                       value={userData?.email}
                       onChange={(e) => onInputChangeHandler(e)}/>
                <div id="email" className="align-self-end text-danger pt-1">{}</div>
            </div>
            <div className="d-flex flex-column mb-3">
                <label htmlFor="password" className="required col-form-label1">Password</label>
                <input type="password" className="form-control1 w-25" name="password" required
                       value={userData?.password}
                       onChange={(e) => onInputChangeHandler(e)}/>
                <div id="password" className="align-self-end text-danger pt-1">{}</div>
            </div>
            <div className="d-flex flex-column mb-3">
                <label htmlFor="passwordConfirmation" className="required col-form-label1">Password Confirmation</label>
                <input type="password" className="form-control1 w-25" name="passwordConfirmation" required
                       value={userData?.passwordConfirmation}
                       onChange={(e) => onInputChangeHandler(e)}/>
                <div id="passwordConfirmation" className="align-self-end text-danger pt-1">{}</div>
            </div>
        </div>),
        actions: (
            <div className="auth-modal__button btn-success bg-warning" onClick={() => register(userData)}>Register</div>
        ),
    }
}

export default useRegistrationContent
