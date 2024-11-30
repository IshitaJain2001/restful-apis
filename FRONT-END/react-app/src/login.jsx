

import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
const navigate = useNavigate()
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Logging in...");

        try {
            const response = await fetch('http://localhost:4000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:'include',
                body: JSON.stringify(credentials),
            });

            const result = await response.json();
            // console.log(result)
            if (response.ok) {
                setMessage("Login successful!");
                console.log(result);
                navigate('/LoggedIn')
            } else {
                setMessage(result.message || "Invalid credentials");
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {message && <p>{message}</p>} 
           
        
            <form onSubmit={handleSubmit}>
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

