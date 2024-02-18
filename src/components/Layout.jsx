import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import Vector1 from '../assets/images/Icon/Vector.png';
import Vector2 from '../assets/images/Icon/Vector (1).png';
import Icon1 from '../assets/images/Icon/Iconly.png';
import Icon2 from '../assets/images/Icon/bi_file-earmark-text.png';
import Icon3 from '../assets/images/Icon/material-symbols_file-copy-outline-rounded.png';
import Icon4 from '../assets/images/Icon/fluent_organization-16-regular.png';
import Icon5 from '../assets/images/Icon/drop down.png';
import Flag from '../assets/images/Icon/Group 7324.png';
import Bell from '../assets/images/Icon/bell.png';
import LogoAva from '../assets/images/Icon/Group 1000001765.png';



const Layout = () => {
    const menus = [
        {
            path: "/thanh-vien",
            name: "Quản trị thành viên",
            icon: Icon1
        },
        {
            path: '/danh-muc',
            name: "Danh mục",
            icon: Icon2,
            icon2: Icon5,
            child: [
                {
                    path: "/nganh-nghe",
                    name: "Ngành nghề"
                },
                {
                    path: "/khoa",
                    name: "Khóa"
                },
                {
                    path: "/class",
                    name: "Lớp"
                },
            ]
        },
        {
            path: '/',
            name: "Đồ án",
            icon: Icon3,
            icon2: Icon5,
            child: [
                {
                    path: "/manage",
                    name: "Quản lý đợt"
                },
                {
                    path: "/stock",
                    name: "Kho đề tài"
                }
            ]
        },
        {
            path: '/to-chuc',
            name: "Tổ chức",
            icon: Icon4
        },

    ]
    return (
        <div className="w-full h-full flex">
            <div className="w-1/6 border-r-2">
                <div className=' h-[150px] place-content-center'>
                    <div className='flex mx-auto justify-center'>
                        <div className='mt-8 w-[70px] h-[70px] flex items-center bg-[#efece8] p-3 rounded-full text-[#c4c4c4] relative'>
                            <img className='absolute right-5' src={Vector1} alt="" />
                            <img className='absolute left-[21px] bottom-[23px] ' src={Vector2} alt="" />
                        </div>
                    </div>
                </div>
                <div class=" px-3 py-3 bg-white">
                    <div className=''>
                        {menus.map((menu, index) => (

                            <MenuItem path={menu.path} name={menu.name} icon={menu.icon} icon2={menu.icon2} child={menu.child} key={index} />
                        ))}
                    </div>


                </div>

            </div>
            <div className="w-5/6">
                <div className="pl-10 pr-20 py-8 flex justify-between">
                    <p className='text-xl font-semibold'>Trường Đại học A</p>
                    <div className='flex gap-4'>
                        <img className='object-cover w-[30px] cursor-pointer' src={Flag} alt="" />
                        <img className='object-cover w-[30px] cursor-pointer' src={Bell} alt="" />
                        <img className='object-cover w-[30px] cursor-pointer' src={LogoAva} alt="" />
                    </div>
                </div>

                <div className=''>
                    <Outlet/>

                </div>
            </div>

        </div>
    );
};

const MenuItem = ({ path, name, child, icon, icon2 }) => {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);


    if (!child) {
        return (
            <Link to={path} className=''>
                <div className='justify-between mb-2 flex items-center p-3 text-gray-600 rounded-lg font-semibold hover:bg-[#F0F7FF] focus:bg-[#F0F7FF] transition-all '>
                    <div className='flex gap-2'>
                        <img className='object-cover' src={icon} alt='' />
                        {name}
                    </div>
                    <img className='object-cover' src={icon2} alt='' />
                </div>
            </Link>
        )
    }
    return (
        <div className="">
            <div className='justify-between flex items-center mb-2 p-3 text-gray-600 rounded-lg font-semibold  hover:bg-[#F0F7FF] transition-all gap-2 ' onClick={() => setOpen(!open)}>
                <div className='flex gap-2'>
                    <img className='object-cover' src={icon} alt='' />
                    {name}
                </div>
                <img className='object-cover' src={icon2} alt='' />
            </div>
            {open && child.map((item, index) => (
                <Link to={`${path}${item.path}`} key={index}>
                    <div className='gap-2 flex font-semibold text-gray-600 hover:bg-[#F0F7FF] focus:bg-[#F0F7FF] rounded justify-start ml-5 p-3'>{item.name}</div>
                </Link>
            ))}
        </div>
    )

}   

export default Layout;