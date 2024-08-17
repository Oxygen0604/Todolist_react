import React, { useEffect, useState } from "react";
import {List,Checkbox} from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import './Todolist.css';
import moment from "moment";

function TodoList({listData,setListData,username}){
  const [selectedIds,setSelectIds]=useState([])
  const [showData,setShowData]=useState([])
  const onChange=(id)=>{
    const upDatedIds=selectedIds.includes(id)?selectedIds.filter(Id=>Id!==id):[...selectedIds,id]
    setSelectIds(upDatedIds)
  }
  const onDelete=(id)=>{
    const upDatedList=listData.filter(item=>item.id!==id)
    setListData(upDatedList)
  }


  useEffect(()=>{
    fetch('http://localhost:3001/getIndex')
    .then(response=>response.json())
    .then(data=>{
      setSelectIds(data)
    })
    .catch(error=>{
      console.log(error)
    })
  },[])


  useEffect(()=>{
    fetch('http://localhost:3001/saveIndex',{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedIds),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, [selectedIds])


  useEffect(()=>{
    setShowData(listData.filter(item=>item.username==username))
  },[listData,username])



  return(
    <List 
      size='large'
      dataSource={showData}
      renderItem={(item,index)=>(
        <List.Item >
          <span className="item" style={{ textDecoration: selectedIds.includes(item.id) ? 'line-through' : 'none',color:moment(item.date)>=moment()?'black':'red'}}>{item.task}<br/>截止时间：{item.date}</span>
          <span>
            <Checkbox onChange={()=>onChange(item.id)}/>
            <br/>
            <DeleteOutlined onClick={()=>onDelete(item.id)} className="delete"/>
          </span>
        </List.Item>   
      )}
    />
  )
}

export default TodoList