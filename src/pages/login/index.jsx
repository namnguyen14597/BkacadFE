import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiInstance from "../../utils/api";
import TopImage from "../../assets/images/TopImage.png"
import BotImage from "../../assets/images/BottomImage.png"
const Login = () => {
    const navigate = useNavigate()
    const params = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log({ username, password });
        apiInstance({
            url: "/api/auth/login",
            method: "POST",
            params: {
                username: username,
                password: password
            }
        }).then(response => {
            const responseData = response.data;
            const { token, userId } = responseData;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            navigate("/")
        })
    }
    return (
        <div className={"w-full flex relative h-screen"}>
            <div className='w-1/2 m-5 '>
                <div className='flex justify-start font-medium text-xl'>Quản lý đồ án</div>
                <div className='w-full flex min-h-full flex-1 flex-col px-6 pt-[140px] lg:px-8 gap-6'>
                    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                        <div className='mb-10 text-[#1890FF] text-2xl font-semibold'>Đăng nhập</div>
                        <div className='flex justify-start font-medium'>Tài khoản</div>
                        <input className='w-full border px-4 py-1 rounded' value={username} onChange={(event) => {
                            const value = event.target.value;
                            setUsername(value)
                        }} placeholder='Tài khoản' />
                    </div>
                    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                        <div className='flex justify-start font-medium'>Mật khẩu</div>
                        <input onChange={(event) => {
                            const value = event.target.value;
                            setPassword(value)
                        }} className='w-full border px-4 py-1 rounded' value={password} type="password" placeholder='Mật khẩu' />
                    </div>
                    <button className='bg-blue-600 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded sm:mx-auto sm:w-full sm:max-w-sm' onClick={() => handleLogin()}>Đăng nhập</button>
                </div>
            </div>
            <div className='w-1/2'>
                <img src={TopImage} className='w-1/3 absolute top-0 right-0' alt="" />
                <img src={BotImage} className='w-2/5 absolute bottom-0 right-[40px]' alt="" />
            </div>
        </div>

    )
}

export default Login
