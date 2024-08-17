import React,{useEffect,useState} from "react"
import {Input,Button,message} from 'antd'
import './login.css'



function Login({state,setState,registState,setRegistState,username,setUsername}){
    const [password,setPassword]=useState("")
    const [list,setList]=useState([])
    const [messageApi,contextHolder]=message.useMessage()


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3001/getPassword');
            const data = await response.json();  
            setList(data);
          } catch (error) {
            console.error("Error", error);
          }
        };
      
        fetchData();
      }, []);


    const onChange_username=(e)=>{
        setUsername(e.target.value)
    }
    const onChange_password=(e)=>{
        setPassword(e.target.value)
    }


    const onClick_submit=()=>{
        const judge=list.find(item=>item.username==username)
        console.log(list)
        if(judge){
            if (judge.password==password){
                setState(true)
                setPassword("")
            }
            else{
                messageApi.error("密码错误")
            }
        }
        else{
            messageApi.error("用户名不存在")
        }
    }


    const onClick_register=()=>{
        setRegistState(true)
    }


    return(
        <div className="inputBox">
            {contextHolder}
            <div id="lebel">LOGIN</div>
            <Input
                id="username"
                onChange={onChange_username}
                value={username}
                placeholder="username"
            ></Input>
            <Input.Password 
                id="password"
                onChange={onChange_password}
                value={password}    
                placeholder="password"
            ></Input.Password>
            <div className="button">
                <span>
                    <Button type="primary" block onClick={onClick_submit}>登录</Button>
                    <Button block onClick={onClick_register}>注册</Button>
                </span>
            </div>
        </div> 
    )
}

export default Login