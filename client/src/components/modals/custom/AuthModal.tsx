import React, {useState} from "react";
import useLoginContent from "./LoginContent";
import useRegistrationContent from "./RegistrationContent";
import CustomModal from "./CustomModal";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import Loader from "../../Loader";

interface ModalHeaderItemProps {
    text: string,
    selected: boolean,
    onClick: () => void
}

interface ModalHeaderProps {
    isLogin: boolean,
    onLoginClick: () => void
    onRegisterClick: () => void
}

const ModalHeaderItem: React.FC<ModalHeaderItemProps> = ({text, selected, onClick}) => {
    return (
        <div className={["auth-modal__button bg-info", "hover", selected ? "selected" : "unselected"].join(" ")} onClick={onClick}>
            {text}
        </div>
    )
}

const ModalHeader: React.FC<ModalHeaderProps> = ({isLogin, onLoginClick, onRegisterClick}) => {
    return (
        <div className="auth-modal__buttons bg-info text-black">
            <ModalHeaderItem text="Login" selected={isLogin} onClick={onLoginClick}/>
            <ModalHeaderItem text="Register" selected={!isLogin} onClick={onRegisterClick}/>
        </div>
    )
}

const AuthModal: React.FC = () => {
    //const {isLoading} = useTypedSelector(store => store.authReducer);
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const {title: loginTitle, body: loginBody, actions: loginActions} = useLoginContent();
    const {title: registrationTitle, body: registrationBody, actions: registrationActions} = useRegistrationContent();


    return (<>
        {isLogin ?
            <CustomModal
                header={<ModalHeader isLogin={isLogin} onLoginClick={() => setIsLogin(true)} onRegisterClick={() => setIsLogin(false)}/>}
                title={loginTitle}
                body={loginBody}
                actions={loginActions}
            /> :
            <CustomModal
                header={<ModalHeader isLogin={isLogin} onLoginClick={() => setIsLogin(true)} onRegisterClick={() => setIsLogin(false)}/>}
                title={registrationTitle}
                body={registrationBody}
                actions={registrationActions}
            />
        }

        {/*{isLoading &&*/}
        {/*<div className="position-absolute vw-100 vh-100 start-0 top-0 d-flex align-items-center justify-content-center" style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>*/}
        {/*    <Loader/>*/}
        {/*</div>}*/}
    </>);
}

export default AuthModal
