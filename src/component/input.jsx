import { useEffect, useState } from 'react';
import './input.css';
import { Button,Input,DatePicker,message,Checkbox} from 'antd';
import moment from 'moment'


function InputBox({username,listData,setListData}){
    const [messageApi,contextHolder]=message.useMessage()
  
  
    const [inputValue,setInputValue]=useState("")
    const handleOnChange = (e) => {
      setInputValue(e.target.value)
    }
  
  
    const [selectedDate, setSelectedDate] = useState(null)
    const handleDateChange = (date, dateString) => {
        setSelectedDate(dateString)
    }
  
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/getTasks');
          const data = await response.json();
          setListData(data);
        } catch (error) {
          console.error("Error", error);
        }
      };
    
      fetchData();
    }, []);
    
  
    const handleOnClick = async () => {
      if (inputValue && selectedDate) {
          const newTask = { id: moment().toString(), task: inputValue, date: selectedDate, username: username };
          setListData(prevListData => [...prevListData, newTask]);

          try {
              const response = await fetch('http://localhost:3001/saveTasks', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newTask),
              });
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              await response.json();
          } catch (error) {
              console.error("Error:", error);
          }

          setInputValue("");
          setSelectedDate(null);
      } else {
          messageApi.open({
              type: "error",
              content: "请输入任务名称和截止时间",
          });
      }
  };

    return(
        <div className='container'>
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
        </div>
        
    )
}


export default InputBox