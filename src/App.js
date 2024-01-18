import { useEffect, useState } from 'react';
import './App.css';
import Todo from './todo-components/Todo';
import { Paper, List, Container, AppBar, Toolbar, Grid, Typography, Button } from "@mui/material"
import AddTodo from './todo-components/AddTodo';
import { call, signout } from './todo-components/service/ApiService';

function App() {

  const [items, setItems] = useState([]);

  // 로딩처리...
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    call("/todo","GET", null)
    .then((response) => {
      setItems(response.data);
      setLoading(false);  // 로딩 끝
    });
  },[]);

  const addItem = (item) => {
 
    call("/todo","POST",item)
    .then((response) => setItems(response.data));
  }
 
  const deleteItem = (item) => {

    call("/todo","DELETE",item)
    .then((response) => setItems(response.data));
  };
  
  // 수정 함수...
  const editItem = (item) => {
    // setItems([...items]);
    call("/todo","PUT",item)
    .then((response) => setItems(response.data));
  }

  //navigationBar 추가
  let navigationBar = (
    <AppBar position='static'>
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant='h6'>오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color='inherit' raised="true" onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  let todoItems = items.length > 0 && (
    <Paper style={{margin: 16}}>
      <List>
        {items.map((item) => (
          <Todo deleteItem={deleteItem} editItem={editItem} item={item} key={item.id} />
        ))}
      </List>
    </Paper>);

  /* 로딩 중이 아닐 때 랜더링할 부분 */
  
let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
)

  /* 로딩 중에 렌더링할 부분 */
  let loadingPage = <h1>로딩중....</h1>;
  let content = loadingPage;

  if(!loading) { /* 로딩 중이 아니면 todoListPage를 선택 */
    content = todoListPage;
  }

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
