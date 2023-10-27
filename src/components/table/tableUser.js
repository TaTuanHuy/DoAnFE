"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Pagination from "../page/Pagination";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { getAllOrder, isDelivered, getAllUser, changeAmdin, deleteUser } from "@/service/order";
import { handler } from "tailwindcss-animate";

function TableUser() {
    const tableRef = useRef(null);
    const [data, setData] = useState();

    const [pageUi, setPageUi] = useState(1);

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem('access_token')
            const response = await getAllUser(token);
            setData(response)
            return setData(response);
        }
        getData()
    }, [])

    const changeAdmin = async (id, data) => {
        window.location.reload()
        const token = localStorage.getItem('access_token')
        const update = await changeAmdin(token, id, data)
        if (update.message === 'succesfull') {
            alert('Thay đổi thành công !')
        } else {
            alert('Thay đổi không thành công! Vui lòng thử lại')
        }
    }

    const deleteAccount = async (id) => {
        window.location.reload()
        const token = localStorage.getItem('access_token')
        const deleteValue = await deleteUser(token, id)
        console.log(deleteValue)
        if (deleteValue.message === "successfull") {
            alert('Xóa thành công !')
        } else {
            alert('Xóa không thành công! Vui lòng thử lại')
        }
    }

    return (
        <>
            <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={tableRef.current}
            >
                <Button variant="none" className="bg-blue-500 text-white ">
                    Export excel
                </Button>
            </DownloadTableExcel>
            <div className="relative overflow-x-auto shadow-md smt:rounded-lg"
                style={{
                    maxHeight: '650px'
                }}
            >
                <table
                    ref={tableRef}
                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto "
                >
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3    text-center">
                                UserName
                            </th>
                            <th scope="col" className="px-6 py-3   text-center ">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3   text-center">
                                Place
                            </th>
                            <th scope="col" className="px-6 py-3  text-center">
                                Change Admin
                            </th>
                            <th scope="col" className="px-6 py-3  text-center">
                                Delete Account
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <th
                                        scope="row"
                                        className="px-7 py-5 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {item.name}
                                    </th>
                                    <th
                                        scope="row"
                                        className="px-7 py-5 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {item.email}
                                    </th>
                                    <th
                                        scope="row"
                                        className="px-7 py-5 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {item.phoneNumber}
                                    </th>
                                    <th
                                        scope="row"
                                        className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {item.isAdmin ? 'Admin' : 'User'}
                                    </th>
                                    <th
                                        scope="row"
                                        className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {item.isAdmin ? '' : <Button
                                            onClick={() => changeAdmin(item._id, item)}
                                        >Change Admin</Button>}
                                    </th>
                                    <th
                                        scope="row"
                                        className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {item.isAdmin ? '' : <Button
                                            onClick={() => deleteAccount(item._id)}
                                        >Delete Account</Button>}
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {/* <Pagination
                setPageUi={setPageUi}
                pageUi={pageUi}
                page={page}
                totalPage={totalPage}
                countProducts={countProducts}
            /> */}
            </div>
        </>
    );
}

export default TableUser;
