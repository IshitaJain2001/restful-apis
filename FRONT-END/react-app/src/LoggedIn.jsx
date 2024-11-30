import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoggedIn() {
    const navigate= useNavigate()
    const [user,setUser]= useState("guest")
    const [logState, setLogState] = useState(true)
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const resp = await fetch('http://localhost:4000/api/users/loggedIn',{
                    method: "GET",
                    credentials: "include",
                });
                const data = await resp.json(); 
                console.log("---------------  data->  ",data);
                if (data && typeof data.name === 'string') {
                    
                    setUser(data.name);
                    console.log(data.name)
                } else {
                    setUser("guest"); 
                }
            
            } catch (e) {
                console.log(e); // Handle error here
            }
        };

        fetchData(); 

    }, [user,logState]);


const loggingOut= async()=>{
    const data= await fetch('http://localhost:4000/api/users/logout',{
        method:'GET',
        credentials:'include'
    })
    const datajson = await data.json()
    console.log(datajson)

    setLogState(false)
  
}

function editProfile(){
    navigate('/edit-profile')
}
    return (
    <>
     <div>
            hello , <span>{user}</span> 
           
            <button onClick={editProfile}>edit profile</button>
           
            {/* You can render some content here */}
        </div>
       <button onClick={loggingOut}>logout</button>
    </>
       
    );
}
