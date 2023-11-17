"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { reckonMonth } from "@/service/order";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function ReckonTabMonth() {

    const tableRef = useRef(null);
    const [startDate, setStartDate] = useState(new Date());
    const [data, setData] = useState({
        orders: [],
        orderQuantity: 0,
        turnOver: 0
    })

    useEffect(() => {
        async function getData() {
            const response = await reckonMonth(startDate);
            return setData(response);
        }
        getData()
    }, [startDate])



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
                        for="first-date"
                    >Thống kê của tháng:
                    </label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker
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

            <h1
                style={{
                    fontWeight: '700'
                }}
            >Tất cả các đơn hàng đã đặt</h1>           

            <div className="relative overflow-x-auto shadow-md smt:rounded-lg"
                style={{
                    maxHeight: '400px'
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
                                            className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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

            <h1
                style={{
                    marginTop: '25px',
                    fontWeight: '700'
                }}
            >Sản phẩm bán chạy</h1>
            <ul
                className="relative overflow-x-auto"
                style={{
                    maxHeight: '300px'
                }}
            >
                {data?.productsBestSale?.map((item) => {
                    return (
                        <li
                            key={item?.product}
                            style={{
                                display: 'flex',
                                // alignItems:'center',
                                justifyContent: 'space-between',
                                padding: '8px 16px',
                                border: '1px solid rgba(151, 145, 145, 0.3)',
                                borderRadius: '15px',
                                marginBottom: '10px'
                            }}
                        >
                            <img
                            style={{
                                height: '80px',
                                width: '80px'
                            }}
                            src={item?.image}
                            >
                            </img>
                            <div>
                                <h2
                                    style={{
                                        fontSize: '18px',
                                        marginBottom: '10px'
                                    }}
                                >{item?.name}</h2>
                                <div
                                    style={{
                                        width: '400px'
                                    }}
                                >
                                    <label
                                        style={{
                                            marginRight: '10px'
                                        }}
                                    >Giá bán:</label>
                                    <label>{item?.price}đ</label>
                                </div>
                            </div>
                            <div>
                                <h3
                                    style={{
                                        marginBottom: '10px'
                                    }}
                                >Số lượng đã bán</h3>
                                <p
                                    style={{
                                        textAlign: 'center'
                                    }}
                                >{item?.amount}</p>
                            </div>
                            <div
                                style={{
                                    width: '150px'
                                }}
                            >
                                <h3
                                    style={{
                                        textAlign: 'center',
                                        marginBottom: '10px'
                                    }}
                                >Tổng tiền thu lại</h3>
                                <p
                                    style={{
                                        textAlign: 'center'
                                    }}
                                >{item?.amount * Number(item?.price)}đ</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    );
}

export default ReckonTabMonth;
