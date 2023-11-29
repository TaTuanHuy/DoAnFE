"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { getAllOrder } from "@/service/order";
import HandleOrder from "../handleOrder/DialogManagementOrder"

function TableOrder() {
    const tableRef = useRef(null);
    const [data, setData] = useState();

    const [dataRender, setDataRender] = useState([])

    useEffect(() => {
        async function getData() {
            const response = await getAllOrder();
            setDataRender(response)
            return setData(response);
        }
        getData();
    }, []);


    const showDelivered = async (condition) => {
        if (condition === 'all') {
            return setDataRender(data)
        }
        const result = data?.filter((item) => {
            return item.isDelivered === condition
        })
        return setDataRender(result)
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

            <div style={{
                marginTop: '20px',
                marginBottom: '20px'
            }}>
                <Button
                    style={{
                        marginRight: '10px',
                    }}
                    onClick={() => showDelivered('all')}
                >Tất cả đơn hàng</Button>
                <Button
                    style={{
                        marginRight: '10px',
                    }}
                    onClick={() => showDelivered(true)}
                >Đã vận chuyển</Button>
                <Button
                    onClick={() => showDelivered(false)}
                >Chưa vận chuyển</Button>
            </div>

            <div className="relative overflow-x-auto shadow-md smt:rounded-lg"
                style={{
                    maxHeight: '600px'
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
                            <th scope="col" className="px-6 py-3 ">
                                Action
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataRender?.map((item, i) => {
                            return (
                                <tr
                                    key={item._id}
                                    style={{
                                        height: '100px'
                                    }}   
                                >
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
                                    <th>
                                        {item.isDelivered
                                            ? ''
                                            :
                                            <HandleOrder
                                                title={"Change Deliver"} 
                                                delivered 
                                                id={item._id}
                                                item={item}
                                            >
                                                <Button>
                                                    Xác nhận đã giao
                                                </Button>
                                            </HandleOrder>
                                        }
                                    </th>
                                    <th>
                                        {item.isDelivered
                                            ? ''
                                            : 
                                            <HandleOrder
                                                title={"Delete"} deleted id={item._id}
                                            >
                                                <Button>
                                                    Hủy đơn hàng
                                                </Button>
                                            </HandleOrder>
                                        }
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

export default TableOrder;
