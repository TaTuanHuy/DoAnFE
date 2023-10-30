"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { getAllOrder, isDelivered, getAllUser, changeAmdin, deleteUser, reckonToday } from "@/service/order";
import { handler } from "tailwindcss-animate";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function TableReckon() {
    const tableRef = useRef(null);
    const [firstDate, setFirstDate] = useState(new Date().setUTCHours(0, 0, 0, 0))
    const [compareDate, setCompareDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1)).setUTCHours(0, 0, 0, 0))

    useEffect(() => {
        async function getData() {
            const response = await reckonToday(firstDate, compareDate);
            return setData(response);
        }
        getData()
    }, [firstDate, compareDate])

    // const [data, setData] = useState({
    //     quantityToday: 0,
    //     percentQuantity: 0,
    //     percentTotal: 0,
    //     turnoverToday: 0,
    //     orderToday: []
    // });
    const [data, setData] = useState({
        quantityToday: 0,
        percentQuantity: 0,
        percentTotal: 0,
        turnoverToday: 0,
        orderToday: []
    });

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    margin: '10px 0 15px 0'
                }}
            >
                <div>
                    <label
                        style={{
                            marginRight: '10px'
                        }}
                        for="first-date"
                    >Thống kê của ngày:
                    </label>
                    <DatePicker id='first-date' selected={firstDate} onChange={(date) => setFirstDate(date)} />
                </div>
                <div>
                    <label
                        style={{
                            marginRight: '10px'
                        }}
                        for="compare-date"
                    >
                        So sánh với ngày:
                    </label>
                    <DatePicker id='compare-date' selected={compareDate} onChange={(date) => setCompareDate(date)} />
                </div>
            </div>

            <div
                style={{
                    marginBottom: '10px',
                    display: 'flex',
                    // justifyContent: 'space-between'
                }}
            >
                <div
                    className="compare-item"
                    style={{
                        width: '250px',
                        height: '100px',
                        borderRight: '1px solid',
                    }}
                >
                    <h1
                        style={{
                            textAlign: 'center',
                            marginBottom: '5px'
                        }}
                    >Order</h1>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '28px'
                        }}
                    >{data.quantityToday} </div>
                </div>

                <div
                    className="compare-item"
                    style={{
                        width: '250px',
                        height: '100px',
                        borderRight: '1px solid',
                    }}
                >
                    <h1
                        style={{
                            textAlign: 'center',
                            marginBottom: '5px'
                        }}
                    >Percent Quantity</h1>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '28px'
                        }}
                    >
                        {data.percentQuantity === 100 ?
                            `Bằng ${data.percentQuantity}%`
                            : data.percentQuantity > 100 ?
                                `Tăng ${data.percentQuantity - 100}%`
                                : `Giảm ${100 - data.percentQuantity}%`
                        }</div>
                </div>

                <div
                    className="compare-item"
                    style={{
                        width: '250px',
                        height: '100px',
                        borderRight: '1px solid',
                    }}
                >
                    <h1
                        style={{
                            textAlign: 'center',
                            marginBottom: '5px'
                        }}
                    >Percent Total</h1>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '28px'
                        }}
                    >{data.percentTotal === 100 ?
                        `Bằng ${data.percentTotal}%`
                        : data.percentTotal > 100 ?
                            `Tăng ${data.percentTotal - 100}%`
                            : `Giảm ${100 - data.percentTotal}%`}</div>
                </div>


            </div>

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
                <h1>Check</h1>
                {/* <table
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
                </table> */}
            </div>
        </>
    );
}

export default TableReckon;
