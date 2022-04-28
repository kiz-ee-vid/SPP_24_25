import React, {ChangeEvent, useState} from "react";
import {LoginRequest} from "../../../models/user/AuthRequest";
import {useActions} from "../../../hooks/useActions";

const useLoginContent = () => {
    const {login} = useActions()

    const [userData, setUserData] = useState<LoginRequest>({
        email: "",
        password: ""
    })

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => {
            return {...prev, [event.target.name]: event.target.value}
        })
    }

    const handleLogin = () => {
        login(userData);
    }

    return {
        title: (<>
            <h3>Login screen</h3>
            <p>Welcome back!</p>
        </>),
        body: (<div className={"align-content-center control1"}>
            <div className="d-flex flex-column mb-3 w-25 align-self-center">
                <label htmlFor="email" className="col-form-label1">Name</label>
                <input className="form-control1" name="email" required
                       value={userData?.email}
                       onChange={(e) => onInputChangeHandler(e)}/>
                <div id="email" className="text-danger pt-1">{}</div>
            </div>
            <div className="ml flex-column mb-3 w-25">
                <label htmlFor="password" className="col-form-label1">Password</label>
                <input type="password" className="form-control1" name="password" required
                       value={userData?.password}
                       onChange={(e) => onInputChangeHandler(e)}/>
                <div id="password" className="text-danger pt-1">{}</div>
            </div>
        </div>),
        actions: (
            <div className="auth-modal__button btn-success bg-warning" onClick={handleLogin}>Login</div>
        )
    }
}

export default useLoginContent
