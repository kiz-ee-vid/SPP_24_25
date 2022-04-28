import {useTypedDispatch} from "./useTypedDispatch";
import {bindActionCreators} from "redux";
import {Actions} from "../store/actions";


export const useActions = () => {
    const dispatch = useTypedDispatch()
    return bindActionCreators(Actions, dispatch)
}