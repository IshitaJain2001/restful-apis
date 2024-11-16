import React, { useState } from 'react'

export default function App() {
  const [users,setUsers]= useState()
  const [id,setId] = useState()
  const fetchUsers= async()=>{
let users= await fetch(`http://localhost:7000/api/${id}`)
let userParsed = await users.json()
setUsers(userParsed.first_name)

  }

  
  return (
    <div>
        <button onClick={fetchUsers}>click to get users: </button>
        <input type="number" onChange={(e)=>setId(e.target.value)} />

        {users}
    </div>
  )
}
