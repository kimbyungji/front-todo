import React, { useState } from "react";
import { ListItem, Checkbox, ListItemText, InputBase, ListItemSecondaryAction, IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

function Todo(props) {

  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true); // 수정을 위한 상태값
  const deleteItem = props.deleteItem;

  // turnOffReadOnly 함수
  const turnOffReadOnly = () => {
    setReadOnly(false);
  }

  const turnOnReadOnly = (e) => {
    if(e.key === 'Enter' && readOnly === false) {
      setReadOnly(true);
      editItem(item);
    }
    
  }

  // todo에서 deleteItem 함수를 추가
  const deleteEventHandler = () => {
    deleteItem(item);
  }

  const editItem = props.editItem;

  const editEventHandler = (e) => {
    // item.title = e.target.value;
    // editItem();
    setItem({...item, title:e.target.value});
  }

  const checkboxEventHandler = (e) => {
    item.done = e.target.checked;
    editItem(item);
  }

  return(
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{ "aria-label": "naked", readOnly: readOnly }}
          value={item.title}
          onClick={turnOffReadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editEventHandler}
          type="text"
          id={item.id}
          name={item.id}
          multiline={true}
          fullWidth={true}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={deleteEventHandler}>
          <DeleteOutline />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;