import React, { useEffect, useRef, useState } from 'react';
import { apiLoggedInInstance } from '../../../utils/api';
import Modal from '../../../components/Modal';
import Circle from '../../../assets/images/Icon/mdi_radioactive-circle-outline.png';


const NganhNghe = () => {
    const [data, setData] = useState([]);
    const [paginatedData, setpaginatedData] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [editField, setEditField] = useState();

    const [filterValue, setFilterValue] = useState({
        code: "",
        name: ""
    });

    const getData = () => {
        apiLoggedInInstance({
            url: "/api/field",
            method: "GET"
        }).then(response => {
            const responeData = response.data;
            const calTotalPage = Math.ceil(responeData.length / pageSize);
            setTotalPage(calTotalPage);
            setData(responeData);
        })
    }

    const handleCreate = () => {
        console.log({ code, name });
        apiLoggedInInstance({
            url: "/api/field",
            method: "POST",
            params: {
                code: code,
                name: name
            }
        }).then((res) => {
            if (res.data) {
                getData();
                handleClose();
                setCode("");
                setName("");

            }

        })
    }

    const handleClose = () => {
        setShowModal(false);
        setEditField(null);
        setCode("");
        setName("");

    }

    const handleDelete = (fieldId) => {
        apiLoggedInInstance({
            url: '/api/field/' + fieldId,
            method: "DELETE"
        }).then(res => {
            if (res.status === 200) {
                getData()
            }
        })
    }

    const handleUpdate = () => {
        if (!editField) return;
        apiLoggedInInstance({
            url: "/api/field/" + editField.id,
            params: {
                code: editField.code,
                name: editField.name
            },
            method: "PUT"
        }).then(() => {
            getData()
            setEditField();
            handleClose();
        })
    }

    const handleSearch = () => {
        apiLoggedInInstance({
            url: "/api/field",
            method: "GET"
        }).then(response => {

            console.log(filterValue);
            let filteredData = response.data;
            filteredData = filteredData.filter(item => {
                return item.code.includes(filterValue.code) && item.name.includes(filterValue.name)
            })
            const calTotalPage = Math.ceil(filteredData.length / pageSize);
            setTotalPage(calTotalPage);
            setData(filteredData);
        })

    }

    const handleReset = () => {
        setFilterValue({
            code: "",
            name: ""
        })
        getData();
    }




    useEffect(() => {
        getData();
    }, [pageSize])

    useEffect(() => {
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        const paginatedData = sortedData.slice(((currentPage - 1) * pageSize), currentPage * pageSize);
        setpaginatedData(paginatedData)
    }, [data, currentPage, pageSize])
    return (
        <div className='w-full'>
            <div className="w-full flex justify-between items-center px-14 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className='font-medium'>Ngành nghề ({data.length})</div>
                <div className="">
                    <button onClick={() => setShowModal(true)} className='bg-[#1890FF] hover:bg-blue-dark text-white py-2 px-4 rounded font-normal flex gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Thêm ngành nghề</button>
                </div>
            </div>
            <div className='relative overflow-x-auto mx-4'>
                <table className='border border-[#F0F0F0] w-full  mt-10'>
                    <thead class="text-base text-gray-700 bg-gray-50  dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                STT
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <img className='mx-auto' src={Circle} alt="" />
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Mã ngành nghề
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Tên ngành nghề
                            </th>
                        </tr>

                    </thead>

                    <tbody className=''>
                        <tr className='border-b'>
                            <td><button onClick={() => { handleReset() }} className='bg-[#1890FF] hover:bg-blue-dark text-white py-1 px-2 my-1 rounded font-normal'>Xóa</button></td>
                            <td><button onClick={() => {
                                handleSearch()
                            }} className='bg-[#1890FF] hover:bg-blue-dark text-white py-1 px-2 my-4 rounded font-normal'>Tìm kiếm</button></td>
                            <td>
                                <input value={filterValue.code} onChange={(event) => {
                                    setFilterValue(pre => ({ ...pre, code: event.target.value }))
                                }} type="text" className='border border-gray-300 bg-white rounded-md' />
                            </td>
                            <td>
                                <input value={filterValue.name} onChange={(event) => {
                                    setFilterValue(pre => ({ ...pre, name: event.target.value }))
                                }} type="text" className='border border-gray-300 bg-white rounded-md' />
                            </td>
                        </tr>
                        {data.length === 0 && (
                            <tr className='bg-white border-b dark:border-gray-700'>
                                <td className='border border-black' colSpan={4}>Không có dữ liệu</td>
                            </tr>
                        )}
                        {paginatedData.map((field, index) => (
                            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 items-center'>
                                <td scope="row" className="px-1 py-4 text-gray-900 whitespace-nowrap dark:text-white">{(currentPage - 1) * pageSize + index + 1}</td>
                                <td className='px-1 py-4'><ButtonAction item={field} onDelete={handleDelete} clickUpdate={() => {
                                    setEditField(field);
                                    setShowModal(true)
                                }} />
                                </td>
                                <td className='px-1 py-4'>{field.code}</td>
                                <td className='px-1 py-4'>{field.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-end my-2'>
                    <button onClick={() => {
                        if (currentPage <= 1) {
                            setCurrentPage([...Array(totalPage)].length);
                        } else {
                            setCurrentPage(currentPage - 1);
                        }
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    {[...Array(totalPage)].map((_, index) => (
                        <button onClick={() => setCurrentPage(index + 1)} className={` px-4 py-2  ${currentPage === index + 1 ? "border border-blue-400" : ""}`}>{(index + 1)}</button>
                    ))}
                    <button onClick={() => {
                        if (currentPage === [...Array(totalPage)].length) {
                            setCurrentPage(1);
                        } else {
                            setCurrentPage(currentPage + 1);
                        }
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                    {/* <div>Tổng số trang: {totalPage}</div> */}
                    <select className='border-2 rounded-md' onChange={(e) => {
                        setPageSize(e.target.value)
                    }}>
                        <option value={10}>10/ trang</option>
                        <option value={20}>20/ trang</option>
                    </select>
                </div>
                {showModal && (<Modal title={editField ? "Chỉnh sửa ngành nghề" : "Thêm ngành nghề"} onClose={handleClose}>
                    {editField ? (
                        <div>
                            <div className='flex justify-between gap-[100px] px-[30px] mb-5'>
                                <div className='w-1/2'>
                                    <p className='flex justify-start mb-2 font-semibold'>Mã ngành nghề</p>
                                    <input value={editField.code} onChange={(e) => {
                                        setEditField(pre => ({ ...pre, code: e.target.value }))
                                    }} autoFocus className='w-full border p-2' placeholder='Mã ngành nghề' />
                                </div>
                                <div className='w-1/2'>
                                    <p className='flex justify-start mb-2 font-semibold'>Ngành nghề</p>
                                    <input value={editField.name} onChange={(e) => {
                                        setEditField(pre => ({ ...pre, name: e.target.value }))
                                    }} className='w-full border p-2' placeholder='Tên ngành nghề' />
                                </div>
                            </div>
                            <div className='border-t flex justify-end pr-[30px]'>
                                <button onClick={() => {
                                    handleUpdate()
                                }} className='w-[100px] bg-[#1890FF] hover:bg-blue-700 text-white py-2 px-4 rounded font-normal border my-3'>Sửa</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className='flex justify-between gap-[100px] px-[30px] mb-5'>
                                <div className='w-1/2'>
                                    <p className='flex justify-start mb-2 font-semibold'>Mã ngành nghề</p>
                                    <input value={code} onChange={(e) => {
                                        setCode(e.target.value)
                                    }} className='w-full border p-2' placeholder='Tên ngành nghề' />
                                </div>
                                <div className='w-1/2'>
                                    <p className='flex justify-start mb-2 font-semibold'>Ngành nghề</p>
                                    <input value={name} onChange={(e) => {
                                        setName(e.target.value)
                                    }} className='w-full border p-2' placeholder='Tên ngành nghề' />
                                </div>
                            </div>
                            <div  className='border-t flex justify-end pr-[30px]'>
                                <button onClick={() => {
                                    handleCreate()
                                }} className='w-[100px] bg-[#1890FF] hover:bg-blue-700 text-white py-2 px-4 rounded font-normal border my-3'>Thêm</button>
                            </div>
                        </div>
                    )}
                </Modal>
                )}
            </div>
        </div>
    );
};

const ButtonAction = ({ item, onDelete, clickUpdate }) => {
    const buttonRef = useRef();
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setOpen(false);
        }
    }
    useEffect(() => {
        document.addEventListener("click", handleClick)
    }, [])
    return (
        <div
            ref={buttonRef}
            style={{
                position: 'relative',

            }}>
            <button onClick={() => setOpen(!open)}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="2.25" stroke="#98BEE1" stroke-width="1.5" />
                    <g clip-path="url(#clip0_4_4716)">
                        <path d="M16 18.25C17.2426 18.25 18.25 17.2426 18.25 16C18.25 14.7574 17.2426 13.75 16 13.75C14.7574 13.75 13.75 14.7574 13.75 16C13.75 17.2426 14.7574 18.25 16 18.25Z" stroke="#98BEE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M21.55 18.25C21.4502 18.4762 21.4204 18.7271 21.4645 18.9704C21.5086 19.2137 21.6246 19.4382 21.7975 19.615L21.8425 19.66C21.982 19.7993 22.0926 19.9647 22.1681 20.1468C22.2436 20.3289 22.2824 20.5241 22.2824 20.7213C22.2824 20.9184 22.2436 21.1136 22.1681 21.2957C22.0926 21.4778 21.982 21.6432 21.8425 21.7825C21.7032 21.922 21.5378 22.0326 21.3557 22.1081C21.1736 22.1836 20.9784 22.2224 20.7812 22.2224C20.5841 22.2224 20.3889 22.1836 20.2068 22.1081C20.0247 22.0326 19.8593 21.922 19.72 21.7825L19.675 21.7375C19.4982 21.5646 19.2737 21.4486 19.0304 21.4045C18.7871 21.3604 18.5362 21.3902 18.31 21.49C18.0882 21.5851 17.899 21.7429 17.7657 21.9442C17.6325 22.1454 17.561 22.3812 17.56 22.6225V22.75C17.56 23.1478 17.402 23.5294 17.1207 23.8107C16.8394 24.092 16.4578 24.25 16.06 24.25C15.6622 24.25 15.2806 24.092 14.9993 23.8107C14.718 23.5294 14.56 23.1478 14.56 22.75V22.6825C14.5542 22.4343 14.4738 22.1935 14.3294 21.9915C14.1849 21.7896 13.9831 21.6357 13.75 21.55C13.5238 21.4502 13.2729 21.4204 13.0296 21.4645C12.7863 21.5086 12.5618 21.6246 12.385 21.7975L12.34 21.8425C12.2007 21.982 12.0353 22.0926 11.8532 22.1681C11.6711 22.2436 11.4759 22.2824 11.2787 22.2824C11.0816 22.2824 10.8864 22.2436 10.7043 22.1681C10.5222 22.0926 10.3568 21.982 10.2175 21.8425C10.078 21.7032 9.9674 21.5378 9.89191 21.3557C9.81642 21.1736 9.77757 20.9784 9.77757 20.7812C9.77757 20.5841 9.81642 20.3889 9.89191 20.2068C9.9674 20.0247 10.078 19.8593 10.2175 19.72L10.2625 19.675C10.4354 19.4982 10.5514 19.2737 10.5955 19.0304C10.6396 18.7871 10.6098 18.5362 10.51 18.31C10.4149 18.0882 10.2571 17.899 10.0558 17.7657C9.85463 17.6325 9.61884 17.561 9.3775 17.56H9.25C8.85218 17.56 8.47064 17.402 8.18934 17.1207C7.90804 16.8394 7.75 16.4578 7.75 16.06C7.75 15.6622 7.90804 15.2806 8.18934 14.9993C8.47064 14.718 8.85218 14.56 9.25 14.56H9.3175C9.56575 14.5542 9.8065 14.4738 10.0085 14.3294C10.2104 14.1849 10.3643 13.9831 10.45 13.75C10.5498 13.5238 10.5796 13.2729 10.5355 13.0296C10.4914 12.7863 10.3754 12.5618 10.2025 12.385L10.1575 12.34C10.018 12.2007 9.9074 12.0353 9.83191 11.8532C9.75642 11.6711 9.71757 11.4759 9.71757 11.2787C9.71757 11.0816 9.75642 10.8864 9.83191 10.7043C9.9074 10.5222 10.018 10.3568 10.1575 10.2175C10.2968 10.078 10.4622 9.9674 10.6443 9.89191C10.8264 9.81642 11.0216 9.77757 11.2188 9.77757C11.4159 9.77757 11.6111 9.81642 11.7932 9.89191C11.9753 9.9674 12.1407 10.078 12.28 10.2175L12.325 10.2625C12.5018 10.4354 12.7263 10.5514 12.9696 10.5955C13.2129 10.6396 13.4638 10.6098 13.69 10.51H13.75C13.9718 10.4149 14.161 10.2571 14.2943 10.0558C14.4275 9.85463 14.499 9.61884 14.5 9.3775V9.25C14.5 8.85218 14.658 8.47064 14.9393 8.18934C15.2206 7.90804 15.6022 7.75 16 7.75C16.3978 7.75 16.7794 7.90804 17.0607 8.18934C17.342 8.47064 17.5 8.85218 17.5 9.25V9.3175C17.501 9.55884 17.5725 9.79463 17.7057 9.99585C17.839 10.1971 18.0282 10.3549 18.25 10.45C18.4762 10.5498 18.7271 10.5796 18.9704 10.5355C19.2137 10.4914 19.4382 10.3754 19.615 10.2025L19.66 10.1575C19.7993 10.018 19.9647 9.9074 20.1468 9.83191C20.3289 9.75642 20.5241 9.71757 20.7213 9.71757C20.9184 9.71757 21.1136 9.75642 21.2957 9.83191C21.4778 9.9074 21.6432 10.018 21.7825 10.1575C21.922 10.2968 22.0326 10.4622 22.1081 10.6443C22.1836 10.8264 22.2224 11.0216 22.2224 11.2188C22.2224 11.4159 22.1836 11.6111 22.1081 11.7932C22.0326 11.9753 21.922 12.1407 21.7825 12.28L21.7375 12.325C21.5646 12.5018 21.4486 12.7263 21.4045 12.9696C21.3604 13.2129 21.3902 13.4638 21.49 13.69V13.75C21.5851 13.9718 21.7429 14.161 21.9442 14.2943C22.1454 14.4275 22.3812 14.499 22.6225 14.5H22.75C23.1478 14.5 23.5294 14.658 23.8107 14.9393C24.092 15.2206 24.25 15.6022 24.25 16C24.25 16.3978 24.092 16.7794 23.8107 17.0607C23.5294 17.342 23.1478 17.5 22.75 17.5H22.6825C22.4412 17.501 22.2054 17.5725 22.0042 17.7057C21.8029 17.839 21.6451 18.0282 21.55 18.25V18.25Z" stroke="#98BEE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_4_4716">
                            <rect width="18" height="18" fill="white" transform="translate(7 7)" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
            {open && (
                <div style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    backgroundColor: 'white',
                    zIndex: 1,
                    border: "1px solid #F0F0F0",
                    width: "50px",
                    margin: "0 auto",
                    transform: "translateX(-50%)",
                    borderRadius: "10%",
                }}>
                    <div className='hover:text-blue-600 hover:bg-slate-100 py-1 cursor-pointer border-b-2' onClick={clickUpdate}>Sửa</div>
                    <div className='hover:text-blue-600 hover:bg-slate-100 py-1 cursor-pointer' onClick={() => {
                        onDelete(item.id);
                        setOpen(false);
                    }}>Xoá</div>
                </div>
            )}
        </div>
    )
}


export default NganhNghe;