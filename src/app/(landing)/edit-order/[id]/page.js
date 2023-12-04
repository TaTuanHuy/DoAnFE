"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { editOrder } from "@/service/order";
import { ToastContainer, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getOrderByID } from '../../../../service/order';

function EditOrder({ params }) {
    const [data, setData] = useState({})
    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem('access_token')
            const response = await getOrderByID(params.id, token)
            setData(response)
        }
        getData()
    }, [])

    const totalPrice = (orderItems) => {
        const result = orderItems?.reduce((total, orderItem) => {
            return (total + (orderItem.amount * orderItem.price))
        }, 0)
        return result
    }

    function handleSetShipping(e) {
        setData({
            ...data,
            shippingAddress: {
                ...data.shippingAddress,
                [e.name]: e.value,
            }
        });
    }

    async function handleEditOrder(id) {
        const result = await editOrder(id, data)
        result.message === 'Successfully' ? alert('Chỉnh sửa thành công') : alert("Chỉnh sửa thất bại")
    }
    return (
        <div className="container min-h-[800px] smt:w-screen smt:px-4 mdt:w-screen">
            <h1 className="py-6 text-[14px] uppercase">
                <Link className="text-blue-500" href={"/order"}>
                    Đơn hàng của bạn
                </Link>{" "}
                / Chỉnh sửa đơn hàng
            </h1>
            <div className="flex flex-row space-x-10 smt:flex-col-reverse smt:space-x-0  mdt:flex-col-reverse mdt:space-x-0">
                <div className="w-[60%] space-y-3 smt:w-full mdt:w-full">
                    <h2 className="text-xl">Thông tin đặt hàng</h2>
                    <form className="space-y-3">
                        <Input
                            placeholder="Name"
                            name="fullName"
                            value={data?.shippingAddress?.fullName}
                            onChange={(e) => handleSetShipping(e.target)}
                            className="border border-solid border-gray-400 focus-visible:border-[2px] focus-visible:border-blue-500"
                        />
                        <Input
                            placeholder="Phone"
                            name="phone"
                            value={data?.shippingAddress?.phone}
                            onChange={(e) => handleSetShipping(e.target)}
                            className="border border-solid border-gray-400 focus-visible:border-[2px] focus-visible:border-blue-500"
                        />
                        <Input
                            placeholder="City"
                            name="city"
                            value={data?.shippingAddress?.city}
                            onChange={(e) => handleSetShipping(e.target)}
                            className="border border-solid border-gray-400 focus-visible:border-[2px] focus-visible:border-blue-500"
                        />
                        <Input
                            placeholder="Address"
                            name="address"
                            value={data?.shippingAddress?.address}
                            onChange={(e) => handleSetShipping(e.target)}
                            className="border border-solid border-gray-400 focus-visible:border-[2px] focus-visible:border-blue-500"
                        />
                    </form>
                </div>
                <div className="w-[45%] space-y-3 smt:w-full mdt:w-full">
                    {data.orderItems?.map((item) => (
                        <div
                            key={item.product}
                            className="flex border-b-[1px] border-solid border-gray-400 smt:w-screen smt:border-none mdt:w-full "
                            style={{
                                alignItems: 'center',
                                padding: '5px 0',
                                justifyContent: 'space-around',
                                margin: '0 0 15px 0',
                                border: '1px solid rgb(211 185 185)',
                                borderRadius: '10px'
                            }}
                        >
                            <img
                                src={item.image}
                                width={80}
                                height={90}
                                alt="..."
                                className="object-cover"
                            />
                            <div className="flex flex-col ">
                                <h3 className="font-medium">{item.name}</h3>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <label
                                        style={{ minWidth: '80px' }}
                                    >Size:</label>
                                    <p className="text-gray-500">{item.size}</p>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <label
                                        style={{ minWidth: '80px' }}
                                    >Số lượng:</label>
                                    <p className="text-gray-500">{item.amount}</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center ">
                                {item.amount * item.price}đ
                            </div>
                        </div>
                    ))}
                    <h3>
                        Tổng Tiền :{" "}
                        <span className="float-right font-bold">
                            {totalPrice(data.orderItems)}
                        </span>
                    </h3>
                </div>
            </div>
            <div className="space-y-4 mt-4">
                <h2 className="text-xl">Đơn vị Vận Chuyển</h2>
                <form className="space-y-3">
                    <input type="radio" id="Fast" name="deliver" checked />
                    <label htmlFor="Fast">
                        <span className="text-yellow-600">Fast</span> Giao hàng tiết kiệm
                    </label>
                    <br />
                    <input type="radio" id="Go" name="deliver" />
                    <label htmlFor="Go">
                        <span className="text-yellow-600">Go JEK</span> Giao hàng tiết kiệm
                    </label>
                </form>
                <h2 className="text-xl">Phương Thức Thanh Toán</h2>
                <form className="space-y-3">
                    <input
                        type="radio"
                        id="faceToFace"
                        name="Payment"
                        value="Thanh Toán khi nhận"
                        checked
                    />
                    <label htmlFor="faceToFace">Thanh toán khi nhận hàng</label>
                    <br />
                    <input
                        type="radio"
                        id="paypal"
                        name="Payment"
                        value="Payment"
                    // onChange={(e) => handleSetShipping(e.target.value)}
                    />
                    <label htmlFor="paypal">Paypal</label>
                </form>
                <div className="h-[100px]">
                    <Button
                        variant="none"
                        onClick={() => handleEditOrder(params.id)}
                        className="float-right  h-12 bg-[#6d3f0a] text-white hover:bg-[#9b7e5e] mt-5"
                    >
                        <Link
                            href={'/order'}
                        >
                            Xác nhận chỉnh sửa
                        </Link>
                    </Button>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default EditOrder;
