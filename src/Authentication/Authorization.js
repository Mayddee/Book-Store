import React, { useState, useEffect, memo } from "react";
import { myContext, users } from "../App";
import "./style.css"
import { useNavigate } from "react-router-dom";

const Authorization = memo(() => {
    const [usernameValue, setUsernameValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const [secondPasswordValue, setSecondPasswordValue] = useState("")
    const [isAuthorized, setAuthorized] = useState(false)
    const [isValid, setValid] = useState(true)

    const navigate = useNavigate()

    const handleSignUp = () => {
        if(isAuthorized){
            console.log("Username alredy exists!")

        }
        if(!isValid){
            console.log("Not valid password!")
        }
        if(!isAuthorized && isValid){
            users.push({username: usernameValue, password: passwordValue})
            console.log("User successfully registered!")
            console.log("Updated users: " , users)
            navigate("/login-page")
            return <div><h1>You are successfully registered!</h1></div>
        }
    }

    useEffect(() => {
        if(usernameValue !== "" && users.find((user) => user.username === usernameValue)){
            setAuthorized(true)
        }else setAuthorized(false)

        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

        if(passwordValue !== "" && (passwordValue === secondPasswordValue || passwordValue.length < 8 || !regex.test(passwordValue))){
            setValid(true)
        }else setValid(false)

    }, [usernameValue, passwordValue, secondPasswordValue])


    return(<div className="authorization">
            <input type="text" placeholder="Username" value={usernameValue} onChange={(event) => {setUsernameValue(event.target.value)}} /> 
            <input type="password" placeholder="Password" value={passwordValue} onChange={(event) => {setPasswordValue(event.target.value)}} />
            <input type="password" placeholder="Repeat password" value={secondPasswordValue} onChange={(event) => {setSecondPasswordValue(event.target.value)}} />
            <button onClick={handleSignUp} >Sign up</button>
     
        {usernameValue !== "" && users.find((user) => user.username === usernameValue) && <p>Username alredy exists!</p>}
        {(passwordValue && secondPasswordValue) !== "" && passwordValue !== secondPasswordValue && <p>Confirmed password wrong!</p>}
        {(passwordValue && secondPasswordValue) !== "" && passwordValue.length < 8 && <p>Password length must at least 8 letters!</p>}
        {(passwordValue && secondPasswordValue) !== "" && !(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/).test(passwordValue) && <p>Password must consist at least one letter, one number and one symbol!</p>}


       

    </div>)
})

export default Authorization
