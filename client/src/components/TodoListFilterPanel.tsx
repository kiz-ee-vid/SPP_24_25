import React, {ChangeEvent, useState} from "react";
import {Plus, Search} from "react-bootstrap-icons";
import CreateTodoModal from "./modals/CreateTodoModal";
import {Button} from "react-bootstrap";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const TodoListFilterPanel: React.FC= () => {
    const [modalShow, setModalShow] = useState<boolean>(false);
    const {filters} = useTypedSelector(store => store.todoReducer);
    const {changeFilters} = useActions();

    const onFilterInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeFilters({[event.target.name]: event.target.value})
    }

    const onCheckBoxToggleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeFilters({[event.target.name]: event.target.checked});
    }

    return (<>
            <div className="d-flex justify-content-between text-nowrap">
                <div className="d-flex align-items-center">
                    <div className="input-group">
                        <div className="form-outline">
                            <div>
                                <Button variant="success" onClick={() => setModalShow(true)} type="button" className="mb-3 d-flex align-items-center">
                                    <Plus/><span>Create note</span>
                                </Button>
                            </div>
                            <input type="search" className="form-control" placeholder="Search" name="filterQuery"
                                   onChange={event => onFilterInputChangeHandler(event)}
                                   value={filters.filterQuery}/>
                            <div className="d-flex pt-2">
                                <div className="form-check form-check-inline">
                                    <input id="showInProgress" name="showInProgress" className="form-check-input bg-warning"
                                           type="checkbox"
                                           onChange={event => onCheckBoxToggleHandler(event)}
                                           checked={filters.showInProgress}/>
                                    <label className="form-check-label" htmlFor="inProgress">In progress</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input id="showCompleted" name="showCompleted" className="form-check-input bg-warning" type="checkbox"
                                           onChange={event => onCheckBoxToggleHandler(event)}
                                           checked={filters.showCompleted}/>
                                    <label className="form-check-label" htmlFor="completed">Completed</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input id="showOverdue" name="showOverdue" className="form-check-input bg-warning" type="checkbox"
                                           onChange={event => onCheckBoxToggleHandler(event)}
                                           checked={filters.showOverdue}/>
                                    <label className="form-check-label" htmlFor="completed">Overdue</label>
                                </div>
                            </div>
                        </div>
                        {/*<button type="button" className="btn btn-primary">*/}
                        {/*    <Search/>*/}
                        {/*</button>*/}

                    </div>
                </div>
            </div>

            <CreateTodoModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default TodoListFilterPanel;
