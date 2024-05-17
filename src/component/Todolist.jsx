import React, { useState } from "react";
import {List,Checkbox} from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import '../App.css';
import moment from "moment";

function TodoList({listData,setListData}){
    const [selectedIds,setSelectIds]=useState([])
    const onChange=(id)=>{
    const upDatedIds=selectedIds.includes(id)?selectedIds.filter(Id=>Id!==id):[...selectedIds,id]
    setSelectIds(upDatedIds)
  }
    const onDelete=(id)=>{
      const upDatedList=listData.filter(item=>item.id!==id)
      setListData(upDatedList)
    }

    return(
    <List 
        size='large'
        dataSource={listData}
        renderItem={(item,index)=>(
          <List.Item>
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