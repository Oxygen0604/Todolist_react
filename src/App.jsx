import { useEffect, useState } from 'react';
import './App.css';
import { Button,Input,DatePicker,message,Checkbox} from 'antd';
import moment from 'moment'
import TodoList from './component/Todolist.jsx';
import Login from './component/login.jsx';
import Regist from './component/register.jsx';
import InputBox from './component/input.jsx';
import Logout from './component/logout.jsx';


function App() {
  useEffect(()=>{
    document.title="Todo List"
  },[])


  const [state,setState]=useState(false)
  const [registState,setRegistState]=useState(false)
  const [username,setUsername]=useState("")
  const [listData,setListData]=useState([])
 

  return (
      <div className="App">
      <div className='managed' style={{ display: state ? 'block' : 'none' }}>
      <div className='logout'>
        <Logout state={state} setState={setState} registState={registState} setRegistState={setRegistState} username={username} setUsername={setUsername}></Logout>
      </div>
      <div className='input'>
        <InputBox username={username} listData={listData} setListData={setListData}></InputBox>
      </div>
      <div className="list">
        <TodoList listData={listData} setListData={setListData} username={username} />
      </div>
    </div>
    <div className='login' style={{ display: (!state&&!registState) ? 'block' : 'none' }}>
      <Login state={state} setState={setState} registState={registState} setRegistState={setRegistState} username={username} setUsername={setUsername}/>
    </div>
    <div className='regist'style={{ display: registState ? 'block' : 'none' }}>
      <Regist registState={registState} setRegistState={setRegistState}/>
    </div>
    </div>
  )
}

export default App
