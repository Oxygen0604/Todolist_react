import { useEffect,useState } from "react";
import {Button} from "antd"
import "./logout.css"


function Logout({state,setState,registState,setRegistState,username,setUsername}){
    const onClick=()=>{
        setState(false)
        setRegistState(false)
        setUsername('')
    }


    return(
        <div>
            <Button onClick={onClick}>注销</Button>
        </div>
    )
}


export default Logout