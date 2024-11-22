import React, { useContext, useState, useEffect } from "react";
import './Header.css';
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Mode from "../Mode/Mode";
import Authentication from "../Authentication/Authetication";
import { myContext } from "../App";
//set position style as flex providing top and left properties to show other Outlet contents!!!
const Header = ({ handleChange, isChecked}) => {
    const navigate = useNavigate()

    const { isLoggedIn, username, password,
         handleLogout} = useContext(myContext)

        // useEffect(()=> {
        //     if(isAuthorized){
        //         console.log(`User: ${username} has logged in!`)

        //     }
    
        // }, [isAuthorized])
    

    return (
        <div className="header">
            <header style={{
                width: "100%",
                height: "50px",
                backgroundColor: "grey",
                position: "fixed",
                top: "0", 
                left: "0",
                display: "flex",
                justifyContent: "space-around",
                paddingTop: "25px",
                zIndex: "10"
            }}>
                <div className="nav-bar" style={{
                    // listStyleType: "none",
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: "100px",

                }}>
                    <p onClick={() => navigate("home")}>Home</p>
                    {/* <p onClick={() => navigate("about")}>About us</p> */}
                    <p onClick={() => navigate("catalog")}>Catalog</p>
                    <p onClick={() => navigate("my-favourites")}>My Favorites</p>
                    <SearchBar />
                {/* <div className="filter-bar">Filter</div> */}
                    <Mode 
                    handleChange={handleChange} 
                    isChecked={isChecked} />
                    {isLoggedIn ? <div>
                        <h2 onClick={() => navigate("")}>My profile</h2>
                        <button onClick={handleLogout} >Logout</button>
                    </div> : <div>
                        <button onClick={() => navigate("/login-page")} >Login</button>
                        <button onClick={() => navigate("/signup-page")} >Sign up</button>
                    </div>
                    }
                    
                    
                </div>
                

            </header>
        </div>
    )

}
export default Header