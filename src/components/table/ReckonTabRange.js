"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { reckonRange } from "@/service/order";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function ReckonTabRange() {

    const tableRef = useRef(null);
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [data, setData] = useState({
        orders: [],
        orderQuantity: 0,
        turnOver: 0
    })

    const handleChange = (range) => {
        const [startDate, endDate] = range;
        setStartDate(startDate);
        setEndDate(endDate);
    };

    useEffect(() => {
        async function getData() {
            const response = await reckonRange(startDate, endDate);
            setData(response)
        }
        getData()
    }, [startDate, endDate])

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    margin: '20px 0 25px 0'
                }}
            >
                <div>
                    <label
                        style={{
                            marginRight: '10px'
                        }}
                        for="from-date"
                    >Từ ngày:
                    </label>
                    <DatePicker
                        id="from-date"
                        selectsStart
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        startDate={startDate}
                    />
                </div>
                <div>
                    <label
                        style={{
                            marginRight: '10px'
                        }}
                        for="to-date"
                    >
                        Đến ngày:
                    </label>
                    <DatePicker
                        id='to-date'
                        selectsEnd
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        endDate={endDate}
                        startDate={startDate}
                        minDate={startDate}
                    />
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
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
                    >{data.orderQuantity}</div>
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
                    >Total</h1>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '28px'
                        }}
                    >{data.turnOver} đ</div>
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

                <>
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
                            {data.orders?.map((item, i) => {
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
                </>
            </div>
        </>
    );
}

export default ReckonTabRange;
