import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css'

const Layout = () => {
    const menus = [
        {
            path: "/",
            name: "Home"
        },
        {
            path: '/products',
            name: "Quản trị thành viên"
        },
        {
            path: '/danh-muc',
            name: "Danh mục",
            child: [
                {
                    path: "/nganh-nghe",
                    name: "Ngành nghề"
                }
            ]
        },

    ]
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.sideBar}`}>
                {menus.map((menu, index) => (

                    <MenuItem path={menu.path} name={menu.name} child={menu.child} key={index} />
                ))}

            </div>
            <div className={`${styles.rightContent}`}>
                <div className={`${styles.header}`}>
                    <div className="">Trường đại học</div>
                    <div className="">Logo</div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

const MenuItem = ({ path, name, child }) => {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);


    if (!child) {
        return (
            <Link to={path}>
                <div className={pathname === path ? styles.active : null}>{name}</div>
            </Link>
        )
    }
    return (
        <div className="">
            <div onClick={() => setOpen(!open)}>{name}</div>
            {open && child.map((item, index) => (
                <Link to={item.path} key={index}>
                    <div className={pathname === item.path ? styles.active : null}>{item.name}</div>
                </Link>
            ))}
        </div>
    )

}

export default Layout;