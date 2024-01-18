import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material"

function AddTodo({addItem}) {

  // 사용자 입력을 저장할 오브젝트
  const [item, setItem] = useState({title:""});

  // onInputChange 정의
  const onInputChange = (e) => {
    setItem({title: e.target.value});
  };

  // onButtonClick 정의
  const onButtonClick = () => {
    if(item.title !== ""){
      addItem(item);
    setItem({title:""});
    }
  }

  // enterKeyEventHandler 함수
  const enterKeyEventHandler = (e) => {
    if(e.key === 'Enter' && item.title !== "") {
      onButtonClick();
    }
  }

  return (
    <Grid container style={{marginTop: 20}}>
      <Grid xs={11} md={11} item style={{paddingRight: 16}}>
        <TextField placeholder="Add Todo here" fullWidth onChange={onInputChange} value={item.title} onKeyDown={enterKeyEventHandler} />
      </Grid>
      <Grid xs={1} md={1} item>
        <Button onClick={onButtonClick} fullWidth style={{height: '100%'}} color="secondary" variant="outlined">
          +
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddTodo;