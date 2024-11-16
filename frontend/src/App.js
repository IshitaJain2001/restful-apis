import React, { useState } from 'react'

export default function App() {
const [users,setUsers]= useState([])
  const fetchUsers= async()=>{
let users= await fetch('http://localhost:7000/api/firstName')
let userParsed = await users.json()
console.log(userParsed)
setUsers(userParsed)
  }
  return (
    <div>
        <button onClick={fetchUsers}>click to get users: </button>
        {users.length>0?(
users.map((user,index)=>{
  return <li key={index} >{user}</li>
})
        ):<li>no names</li>}
    </div>
  )
}
