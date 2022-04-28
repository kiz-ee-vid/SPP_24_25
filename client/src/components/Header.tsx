import React from "react";
import {Button} from "react-bootstrap";
import {useActions} from "../hooks/useActions";
import {IUser} from "../models/user/IUser";

interface HeaderProps {
    user: IUser
}

const Header: React.FC<HeaderProps> = ({user}) => {
    const {logout} = useActions();

    const logOutHandler = () => {
        logout();
    }

    return (
        <div className="d-flex align-items-center justify-content-between pt-3 pb-3 mb-3 border-bottom border-secondary">
            <div className="pt-2">Welcome back, <b>{user?.name}</b></div>
            <Button variant="warning" onClick={logOutHandler}>Log out</Button>
        </div>
    )
}

export default Header
