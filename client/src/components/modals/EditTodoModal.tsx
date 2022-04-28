import React, {ChangeEvent, useEffect, useState} from "react";
import Modal, {ModalProps} from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {formatDate, prepareFormData} from "../../utils/converter";
import FileUpload from "../FileUpload";
import {ITodo} from "../../models/todo/ITodo";
import {showToast, ToastReason} from "../../utils/showToast";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import useSocket from "../../hooks/useSocket";
import {useActions} from "../../hooks/useActions";
import {UpdateTodoRequest} from "../../models/todo/TodoRequests";

interface EditTodoModalProps extends ModalProps{
    todo: ITodo
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({todo, onHide, show}, props) => {
    const {successMsg} = useTypedSelector(store => store.todoReducer);
    const {updateTodo} = useActions();


    const [updatedTodo, setUpdatedTodo] = useState<UpdateTodoRequest>(todo);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (successMsg) {
            setUpdatedTodo(todo);
            onHide?.();
        }
    }, [successMsg])

    const updateTodoHandler = async () => {
        await updateTodo({...updatedTodo, file});
    }

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUpdatedTodo(prev => {
            return {...prev, [event.target.name]: event.target.value}
        })
    }

    const onRadioChangeHandler = (completed: boolean) => {
        setUpdatedTodo(prev => {
            return {
                ...prev,
                completed: completed
            }
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            {...props}

            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className={"bg-info"}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Note
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={"bg-info"}>
                <div className="d-flex flex-column  mb-3">
                    <label htmlFor="description" className="col-form-label">Description:</label>
                    <textarea className="form-control required" name="description"
                              onChange={event => onInputChangeHandler(event)} value={updatedTodo.description}>{}</textarea>
                    <div id="description" className="align-self-end text-danger pt-1">{}</div>
                </div>
                <div className="d-flex flex-column  mb-3">
                    <label htmlFor="deadline required" className="col-form-label">Deadline:</label>
                    <input type="date" className="form-control" name="deadline"
                           onChange={event => onInputChangeHandler(event)}
                           value={formatDate(updatedTodo.deadline!)}/>
                    <div id="deadline" className="align-self-end text-danger pt-1">{}</div>
                </div>
                <div className="d-flex flex-column  mb-3">
                    <label htmlFor="status" className="col-form-label">Status:</label>
                    <div className="d-flex">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="status" id="completed"
                                   onChange={() => onRadioChangeHandler(true)} checked={updatedTodo.completed}/>
                            <label className="form-check-label" htmlFor="completed">
                                Completed
                            </label>
                        </div>
                        <div className="form-check ms-3">
                            <input className="form-check-input" type="radio" name="status" id="inProgress"
                                   onChange={() => onRadioChangeHandler(false)} checked={!updatedTodo.completed}/>
                            <label className="form-check-label" htmlFor="completed">
                                In progress
                            </label>
                        </div>
                    </div>
                </div>
                <FileUpload onChange={setFile}/>
            </Modal.Body>
            <Modal.Footer className={"bg-info"}>
                <Button className="btn-danger" onClick={onHide}>Close</Button>
                <Button className="btn-success" onClick={() => updateTodoHandler()}>Apply</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditTodoModal;
