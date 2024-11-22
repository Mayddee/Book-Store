import React, { useCallback, useContext, useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { myContext, users } from "../App";
import { isAxiosError } from "axios";
import "./style.css"


const Authentication = memo(() => {
    const { isLoggedIn, setLoggedIn, setUsername, setPassword, Logout, login} = useContext(myContext)
    const [usernameValue, setUsernameValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const navigate = useNavigate()

    const [loginAttempted, setLoginAttempted] = useState(false); 

    const handleOnChangeUsername = useCallback((event) => {
        setUsernameValue(event.target.value)
    }, [])
    
    const handleOnChangePassword = useCallback((event) => {
        setPasswordValue(event.target.value)
    
    }, [])

    const handleLogin = () => {
        const findUser = users.find((user) => user.username === usernameValue && user.password === passwordValue)
        if(findUser) {
            setLoggedIn(true)
            navigate("/home")
            setUsername(usernameValue);
       
            setPassword(passwordValue);
            
            console.log("User logged in successfuly: ", isLoggedIn)
        }else {
            console.log("wwrong credentials!")
        }
        console.log("Users: ", users)

    }


    return (
        <div className="login">
            <input name="login" type="text" placeholder="Username" value={usernameValue} onChange={handleOnChangeUsername} />
            <input name="password" type="password" placeholder="Password" value={passwordValue} onChange={handleOnChangePassword} />
            <button onClick={handleLogin} >Login</button>
        </div>
    )

})
export default Authentication