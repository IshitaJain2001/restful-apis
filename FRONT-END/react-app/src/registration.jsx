import React, { useState } from 'react'

import {  useNavigate } from 'react-router-dom'
export default function Registration() {
const Navigate = useNavigate()

const [mess,setMess]= useState('register here')
    const [formdata,setFormdata]= useState({
        name:"",
        email:"",
        password:"",
        confPassword:"",
        avatar:null,
        coverImage:null

    })

  
    const handlechange=(e)=>{
const {name,value,type,files} = e.target 
if(type==="file"){
    setFormdata({
        ...formdata,
      [name]:files[0] // Store the selected file
      });
}
else{
    setFormdata({
    ...formdata,
    [name]: value
})}
    }

    console.log(formdata)



    async function handleSubmit(e){

        
        e.preventDefault()

        const formData = new FormData();
        formData.append("name", formdata.name);
        formData.append("email", formdata.email);
        formData.append("password", formdata.password);
        formData.append("confPassword", formdata.confPassword);
        formData.append("avatar", formdata.avatar); // Append file
        formData.append("coverImage", formdata.coverImage); 

    try{
        const data= await fetch('http://localhost:4000/api/users/register', {
            method: 'POST',
           
            body: formData,
          })
     

    if(data.ok){
        setMess("proceeding")
        console.log("data is ok")
        Navigate('/login')

    
    }

  else{
            
    let result=await data.json()

    console.log(result)

    setMess(result.message)
  }
          
    }
     catch(e){
        console.error('Error:', e);
 setMess(e.message)
     }  
    }
  return (
    <div>
         <h1>  Registration FORM</h1>

   
      {
            mess==="register here"?
          <p style={{color:"black"}}>{mess}</p>
            : <p style={{color:"red"}}>{mess}</p>
         }
    
       
         <form action='/submit' method='POST' onSubmit={handleSubmit} encType="multipart/form-data">
         <label htmlFor="name">Name:       </label>
  <input type="text" name="name" id="name" onChange={handlechange} />

  <br />
  <br />
  <label htmlFor="email">Email:             </label>
  <input type="email" name="email" id="email"  onChange={handlechange}/>
  <br />
  <br />
  <label htmlFor="password">Password:           </label>
  <input type="password" name="password" id="password"  onChange={handlechange}/>
  <br />
  <br />
  <label htmlFor="confPassword">Confirm Password:           </label>
  <input type="password" name="confPassword" id="confPassword"  onChange={handlechange}/>
  <br />
  <br />
  <label htmlFor="coverImage">Cover Image:         </label>
  <input type="file" name="coverImage" id="coverImage"  onChange={handlechange}/>
  <br />
  <br />
  <label htmlFor="avatar">Avatar:           </label>
  <input type="file" name="avatar" id="avatar"  onChange={handlechange}/>
  <br />
  <br />

<input type="submit" value="submit" />


         </form>

    </div>
  )
}
