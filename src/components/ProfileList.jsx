import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

const ProfileList = ({ setIsLogin, toggleIsProfileList }) => {

    const authUser = localStorage.getItem('authUser');
    const authUserName = authUser ? JSON.parse(authUser).name : " ";
    
    const logout = async () => {
        try {
            const res = await axios.delete("/api/home/", {withCredentials: true})
            console.log(res)
            localStorage.removeItem('authUser');
            setIsLogin(false)
            toggleIsProfileList(false)
        } catch (err) {
            console.log(err.response)
        }
    }

    const submitLogout = (e) => {
        e.preventDefault();
        logout()
    }

    return (
        <ul className='profile-list'>
            <li>{authUserName}</li>
            {/* <li><Link to ='#' className='profile-link'>Favorites</Link></li>
            <li><Link to ='#' className='profile-link'>Edit profile</Link></li> */}
            <li><Link to ='#' className='profile-link' onClick= {submitLogout}>Logout</Link></li>
        </ul>
    )
}

export default ProfileList
