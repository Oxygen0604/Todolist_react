import { useEffect, useState } from 'react';
import './App.css';
import { Button,Input,DatePicker,message,Checkbox} from 'antd';
import moment from 'moment'
import TodoList from './component/Todolist.jsx';

function App() {
  const [messageApi,contextHolder]=message.useMessage()

  useEffect(()=>{
    document.title="Todo List"
  },[])

  const [inputValue,setInputValue]=useState("")
  const handleOnChange = (e) => {
    setInputValue(e.target.value)
  }

  const [selectedDate, setSelectedDate] = useState(null)
  const handleDateChange = (date, dateString) => {
      setSelectedDate(dateString)
  }

  const [listData,setListData]=useState([])
  const handleOnClick = () => {
    if (inputValue && selectedDate) {
      setListData([...listData, {id:moment(),task: inputValue, date: selectedDate}]);
      setInputValue("");
      setSelectedDate(null);
    }
    else{
        messageApi.open({
          type:"error",
          content:"请输入任务名称和截止时间"
        })
      }
  };
  
 
  return (
    <div className="App">
      {contextHolder}
    <div className="head">Todo List</div>
    <div className="input">
      <Input
        onChange={handleOnChange}
        value={inputValue} 
        placeholder="输入任务名称" 
        id="inputNote"
      />
    </div>
    <div className="date">
      <DatePicker 
        onChange={handleDateChange}
        placeholder="选择截止时间" 
        id="inputDate"
        value={selectedDate ? moment(selectedDate, "YYYY-MM-DD") : null}
      />
      <Button 
        type="primary" 
        id="add" 
        onClick={handleOnClick}
      >
        添加
      </Button>
    </div>
    <div class="list">
      <TodoList listData={listData} setListData={setListData} />
    </div>
    </div>
  );
}

export default App;
