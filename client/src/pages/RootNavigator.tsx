import React, {useEffect} from 'react';
import TodosPage from "./TodosPage";
import AuthPage from "./AuthPage";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {showToast, ToastReason} from "../utils/showToast";
import {addErrorsToDom} from "../utils/addErrorsToDom";

const RootNavigator: React.FC = () => {
    const {user, error, successMsg} = useTypedSelector(store => store.authReducer);
    const {isAuthorized} = useActions();

    useEffect(() => {
        isAuthorized();
    }, []);

    useEffect(() => {
        if (successMsg) {
            showToast(successMsg, ToastReason.SUCCESS);
        }
    }, [successMsg])

    useEffect(() => {
        if (error) {
            showToast(error.message);
            addErrorsToDom(error.validationErrors);
        }
    }, [error])

    return (<>
        {user ? <TodosPage user={user}/> : <AuthPage/>}
    </>)
}

export default RootNavigator;
