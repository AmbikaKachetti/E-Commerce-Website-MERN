/*
import React, {useState} from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password:"",
    email:""
  })
  const changeHandler = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const login = async () => {
    console.log("Login Function Executed", formData);
    try {
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const responseData = await response.json();

        console.log("API Response:", responseData); // Debugging log
        if (responseData?.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
            console.error("Signup failed:", responseData.message || "Unknown error");
        }
    } catch (error) {
        console.error("Error during signup:", error);
    }

  }
  const signup = async () => {
    console.log("Sign Up Function Executed", formData);
    try {
        const response = await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const responseData = await response.json();

        console.log("API Response:", responseData); // Debugging log
        if (responseData?.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
            console.error("Signup failed:", responseData.message || "Unknown error");
        }
    } catch (error) {
        console.error("Error during signup:", error);
    }
};
*/

      /* this code is removed from current fnctionality by me

      const signup = async () => {
        console.log("Sign Up Function Executed", formData);
        let responseData;
        await fetch('http://localhost:4000/signup',{
          method: 'POST',
          headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        .then((response)=>response.json())
        .then((data)=>responseData)

        if(responseData.success){
          localStorage.setItem('auth-token', responseData.token);
          window.location.replace("/");
        }
      }
      */
/*
  return (
    <div className='loginsignup'>
      <div className='login_signup_container'>
        <h1>{state}</h1>
        <div className="loginsignup_fields">
          {state==="Sign Up"?<input name = "username" onChange = {changeHandler} value={formData.username} type="text" placeholder='Your Name' />:<></>}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name= "password" value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"
        ?
        <p className="loginsignup_login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
        :
        <p className="loginsignup_login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
        <div className="loginsignup_agree">
          <input type="checkbox" name='' id =''/>
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
*/

import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        console.log("Login Function Executed", formData);
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            console.log("API Response:", responseData); // Debugging log
            if (response.ok && responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                alert(responseData.errors || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again later.");
        }
    };

    const signup = async () => {
        console.log("Sign Up Function Executed", formData);
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            console.log("API Response:", responseData); // Debugging log
            if (response.ok && responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                alert(responseData.errors || "Signup failed. Please check your inputs.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred during signup. Please try again later.");
        }
    };

    return (
        <div className='loginsignup'>
            <div className='login_signup_container'>
                <h1>{state}</h1>
                <div className="loginsignup_fields">
                    {state === "Sign Up" && (
                        <input
                            name="username"
                            onChange={changeHandler}
                            value={formData.username}
                            type="text"
                            placeholder='Your Name'
                        />
                    )}
                    <input
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                        type="email"
                        placeholder='Email Address'
                    />
                    <input
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                        type="password"
                        placeholder='Password'
                    />
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
                {state === "Sign Up" ? (
                    <p className="loginsignup_login">
                        Already have an account? <span onClick={() => { setState("Login") }}>Login here</span>
                    </p>
                ) : (
                    <p className="loginsignup_login">
                        Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span>
                    </p>
                )}
                <div className="loginsignup_agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
