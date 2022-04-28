import React, {ChangeEvent, useEffect, useState} from "react";
import Modal, {ModalProps} from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {formatDate} from "../../utils/converter";
import FileUpload from "../FileUpload";
import useSocket from "../../hooks/useSocket";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {CreateTodoRequest} from "../../models/todo/TodoRequests";
import {useActions} from "../../hooks/useActions";


const CreateTodoModal: React.FC<ModalProps> = ({onHide, show}, props) => {
    const {successMsg} = useTypedSelector(store => store.todoReducer);
    const {createTodo} = useActions();

    const initialTodo: CreateTodoRequest = {
        description: "",
        deadline: new Date()
    };

    const [todo, setTodo] = useState<CreateTodoRequest>(initialTodo);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (successMsg) {
            setTodo(initialTodo);
            onHide?.();
        }
    }, [successMsg])

    const createTodoHandler = () => {
        createTodo({...todo, file});
    }

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTodo(prev => {
            return {...prev, [event.target.name]: event.target.value}
        })
    }

    return (
        <Modal
            {...props}
            onHide={onHide}
            show={show}

            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className={"bg-info"}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Note
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={"bg-info"}>
                <div className="d-flex flex-column mb-3 bg-info">
                    <label htmlFor="description" className="required col-form-label bg-info">Title</label>
                    <textarea className="form-control" name="description"
                              onChange={event => onInputChangeHandler(event)}
                              value={todo?.description}
                              required>{}</textarea>
                    <div id="description" className="align-self-end text-danger pt-1">{}</div>
                </div>
                <div className="d-flex flex-column mb-3">
                    <label htmlFor="deadline" className="required col-form-label">Deadline</label>
                    <input type="date" className="form-control" name="deadline"
                           onChange={event => onInputChangeHandler(event)}
                           value={formatDate(todo?.deadline!)}/>
                    <div id="deadline" className="align-self-end text-danger pt-1">{}</div>
                </div>
                <FileUpload onChange={setFile}/>
            </Modal.Body>
            <Modal.Footer className={"bg-info"}>
                <Button variant="danger" onClick={onHide}>Close</Button>
                <Button variant="success" onClick={createTodoHandler}>Create</Button>
            </Modal.Footer>
        </Modal>
    );

}

export default CreateTodoModal;
