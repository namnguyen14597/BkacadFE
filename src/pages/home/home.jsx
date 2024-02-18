import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiLoggedInInstance } from '../../utils/api';

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [user, setUser] = useState({});

    useEffect(() => {
        apiLoggedInInstance({
            url: '/api/auth/user-info',
            method: "GET"
        }).then(response => {
            setUser(response.data);
            console.log(response)
        })
    }, [])
  return (
    <div>
        <button onClick={() => {
            navigate('/login')
        }}>
            username: {user.username}
        </button>
        <div>{token ? "Da dang nhap" : 'Chua dang nhap'}</div>
    </div>
  )
}

export default Home
