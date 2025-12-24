import axios from "axios"
import React, { useState } from "react"

const Login: React.FunctionComponent=() =>{
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("")
  const login = async(e:any)=>{
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/api/v1/signin",{username:username,password:password},{withCredentials:true});
    console.log(response)
  }

  return (
    <div>
        <form action="">
            <input type="text" placeholder={"username"} value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="text" placeholder={"password"} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={(e)=>login(e)}>Submit</button>
        </form>
    </div>
  )
}

export default Login