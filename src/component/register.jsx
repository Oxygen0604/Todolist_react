import React, { useEffect, useState } from "react";
import { Input, Button, message } from "antd";
import './register.css';


function Regist({ registState, setRegistState }) {
  const [username, setUsername] = useState('');
  const [password_1, setPassword_1] = useState('');
  const [password_2, setPassword_2] = useState('');
  const [list, setList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

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

  const onClick = async () => {
    if (!list.find(item => item.username === username)) {
      if (password_1 === password_2) {
        if (emailRegex.test(username)) {
          if (passwordRegex.test(password_1)) {
            const newUser = { username: username, password: password_1 };
            const updatedList = [...list, newUser];

            try {
              await fetch('http://localhost:3001/savePassword', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
              });

              setList(updatedList);
              setUsername('');
              setPassword_1('');
              setPassword_2('');
              messageApi.success('注册成功');
              setRegistState(false);
            } catch (error) {
              console.error('保存密码失败', error);
              messageApi.error('保存密码失败');
            }
          } else {
            messageApi.error("密码为包含数字和字母的至少八位有效字符");
          }
        } else {
          messageApi.error("请输入正确的账号邮箱格式");
        }
      } else {
        messageApi.error('两次输入密码不一致');
      }
    } else {
      messageApi.error('该用户名已注册');
    }
  };

  const onClick_2 = () => {
    setRegistState(false);
  };

  const onChange_username = (e) => {
    setUsername(e.target.value);
  };

  const onChange_password_1 = (e) => {
    setPassword_1(e.target.value);
  };

  const onChange_password_2 = (e) => {
    setPassword_2(e.target.value);
  };

  return (
    <div>
      {contextHolder}
      <div className="label">
        REGIST
      </div>
      <div className="inputBox">
        <Input className='input' onChange={onChange_username} value={username} placeholder="username"></Input>
        <Input.Password className='input' onChange={onChange_password_1} value={password_1} placeholder="password"></Input.Password>
        <Input.Password className='input' onChange={onChange_password_2} value={password_2} placeholder="password again"></Input.Password>
        <div className="button">
          <Button type="primary" block onClick={onClick}>注册</Button>
          <Button block onClick={onClick_2}>返回登陆</Button>
        </div>
      </div>
    </div>
  );
}

export default Regist;
