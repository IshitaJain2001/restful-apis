import React, { useEffect, useState } from "react";

export default function Editprofile() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fn = async () => {
      const retrievedData = await fetch(
        "http://localhost:4000/api/users/EditProfile",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await retrievedData.json();
      if (retrievedData.ok) {
        setCredentials({ name: data.name, email: data.email, password: "" });
      }
    };

    fn();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await fetch("http://localhost:4000/api/users/Edit-Profile", {
      method: "PUT",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if(!data.ok){
      const refreshData=   await fetch('http://localhost:4000/api/users/refresh',{
        method:'POST',
        credentials:'include'
      })

      if(!refreshData.ok){
        console.log("kindly login")
      }
      else{
        
    const newdata = await fetch("http://localhost:4000/api/users/Edit-Profile", {
        method: "PUT",
        credentials: "include",
  
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      data = newdata
      }
    }

    const res = await data.json();

    console.log(res);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  return (
    <div>
      <p>edit your data {credentials.name}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={credentials.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />

        <button type="submit">Enter</button>
      </form>
    </div>
  );
}
