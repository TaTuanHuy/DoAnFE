"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getOrderByUserID } from "../../../service/order"
import HandleOrder from "@/components/handleOrder/DialogManagementOrder";

function Order() {
    const tableRef = useRef(null);
    const user = useSelector((state) => state.auth.user);

    const [order, setOrder] = useState([])

    useEffect(() => {
        async function getData() {
            if (!user) {
                return
            }
            const token = localStorage.getItem('access_token')
            const response = await getOrderByUserID(user._id, token);
            return setOrder(response);
        }
        getData();
    }, [user]);

    return (
        <div className="relative overflow-x-auto shadow-md smt:rounded-lg mt-4"
            style={{
                minHeight: '500px',
                maxWidth: '1300px',
                margin: 'auto'
            }}
        >
            <table
                ref={tableRef}
                className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto "
                style={{
                    marginTop: '30px'
                }}
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
                        <th
                            style={{
                                minWidth: '220px'
                            }}
                            scope="col" colSpan={3} className="px-6 py-3 ">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {order?.map((item, i) => {
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
                                            <div key={order._id}>
                                                <span>
                                                    {order.name} x {order.size} x {order.amount}
                                                </span>
                                                <br />
                                            </div>
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
                                    {item.isDelivered ? "đã giao hàng" : "chưa giao hàng"}
                                </th>
                                <th>
                                    {item.isDelivered
                                        ? ''
                                        : <Button
                                        >
                                            <Link
                                                href={`/edit-order/${item._id}`}
                                            >
                                                Chỉnh sửa thông tin
                                            </Link>
                                        </Button>
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
        </div >
    )
}

export default Order