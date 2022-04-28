import React from "react";
import {SortDown, SortUp} from "react-bootstrap-icons";
import {SortDirection, SortParams} from "../models/todo/TodoRequests";

interface ISort {
    field: string
    sort: SortParams | undefined,
    setSort: (sort: SortParams | undefined) => void
}

const SortPanel: React.FC<ISort> = ({field, sort, setSort}) => {
    const onClickHandler = (field: string, direction: SortDirection) => {
        setSort({field, direction})
    }

    return (<>
        <SortUp className="ms-2" style={{color:  sort && (sort.field === field && sort.direction) === 'asc' ? '#fff' : '#aaa'}} onClick={() => onClickHandler(field, "asc")}/>
        <SortDown className="ms-1" style={{color: sort && (sort.field === field && sort.direction) === 'desc' ? '#fff' : '#aaa'}} onClick={() => onClickHandler(field, "desc")}/>
    </>)
}

export default SortPanel;
