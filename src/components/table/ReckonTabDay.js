"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { reckonToday } from "@/service/order";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function ReckonTabDay() {

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

    const [data, setData] = useState({
        quantityToday: 0,
        percentQuantity: 0,
        percentTotal: 0,
        turnoverToday: 0,
        turnoverSecondDate: 0,
        orderToday: []
    });

    const percentRender = (data) => {
        if (data === 0) {
            return `Bằng ${data}%`
        }
        if (data === 100) {
            return `Bằng ${data}%`
        }
        if (data > 100) {
            return `Tăng ${data - 100}%`
        }
        return `Giảm ${100 - data}%`
    }

    return (
        <>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '10px 0 25px 0'
                }}
            >
                <div>
                    <label
                        style={{
                            marginRight: '10px'
                        }}
                        htmlFor="first-date"
                    >Thống kê của ngày:
                    </label>
                    <DatePicker id='first-date' selected={firstDate} onChange={(date) => setFirstDate(date)} />
                </div>
                <div>
                    <label
                        style={{
                            marginRight: '10px'
                        }}
                        htmlFor="compare-date"
                    >
                        So sánh với ngày:
                    </label>
                    <DatePicker id='compare-date' selected={compareDate} onChange={(date) => setCompareDate(date)} />
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '10px'
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
                    >Compare Quantity</h1>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '28px'
                        }}
                    >
                        {data.quantitySecondDay}</div>
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
                    >Total day</h1>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '28px'
                        }}
                    >{data.turnoverToday} đ</div>
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
                    >Compare day</h1>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '28px'
                        }}
                    >{data.turnoverSecondDate} đ</div>
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
                        {percentRender(data.percentQuantity)}</div>
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
                    >
                        {percentRender(data.percentTotal)}
                    </div>
                </div>


            </div>

            <DownloadTableExcel
                filename="reckon table"
                sheet="reckons"
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
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3   text-center ">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3   text-center">
                                    Total
                                </th>
                                <th scope="col" className="px-6 py-3  text-center">
                                    City
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Addres
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    isPaid
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    isDelivered
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.orderToday?.map((item, i) => {
                                return (
                                    <tr key={item._id}>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.shippingAddress.fullName}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.shippingAddress.phone}
                                        </th>
                                        <th
                                            scope="row"
                                            className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.orderItems.map((order) => {
                                                return (
                                                    <>
                                                        <span>
                                                            {order.name} x {order.size} x {order.amount}
                                                        </span>
                                                        <br />
                                                    </>
                                                );
                                            })}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.totalPrice}
                                        </th>
                                        <th
                                            scope="row"
                                            className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.shippingAddress.city}
                                        </th>
                                        <th
                                            scope="row"
                                            className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.shippingAddress.address}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.isPaid ? "đã Thanh toán" : "chưa thanh toán"}
                                        </th>
                                        <th
                                            scope="row"
                                            className="text-center  px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.isDelivered ? "đã ship" : "chưa ship"}
                                        </th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
            </div>
        </>
    );
}

export default ReckonTabDay;
