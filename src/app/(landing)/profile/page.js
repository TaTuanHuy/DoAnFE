"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {editUser} from "../../../service/user"

function Profile() {
    const user = useSelector((state) => state.auth.user);
    const [edit, setEdit] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        setName(user?.name);
        setEmail(user?.email);
        setPhone(user?.phoneNumber);
    }, [user]);

    async function hanldleSubmit(id) {
        const token = localStorage.getItem('access_token')
        const response = await editUser({
            name: name,
            email: email,
            phoneNumber: phone,
        }, id, token)
    }

    const [component, setComponent] = useState('default')

    const profileComponent = {
        edit: 
        <EditProfile />,
        default: <DefaultProfile />
    }[component]

    return (
        <div className="container h-[500px] smt:h-[800px] smt:px-4">
            <h1 className="py-[15px] text-[14px]">
                <Link href={"/"}>HOME</Link>/ ACCOUNT
            </h1>
            <div className="flex py-[50px] smt:flex-col">
                <div className="w-[20%] smt:w-screen">
                    <div className="text-[28px]">
                        HELLO
                        <br />
                        <span className="text-[32px] font-bold">{user?.name}</span>
                    </div>
                    <div className="flex flex-col">
                        <Link href={"/profile"}>ACCOUNT</Link>
                        <Link href={"/cart"}>CART</Link>
                    </div>
                </div>
                <div className=" border-l-[1px] border-slate-900 smt:border-b-[1px] smt:mt-5 smt:w-screen"></div>
                <div className="w-[80%] py-6 ml-7  smt:w-screen smt:ml-0">
                    {edit ? (
                        <>
                            <h2 className="text-xl font-bold mb-3 w-screen">Cập nhật thông tin</h2>

                            <form className="flex flex-col">
                                <label htmlFor="name" className="font-bold">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    value={name}
                                    className="w-[350px] py-1 px-3 ml-3 smt:w-[130px]"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label htmlFor="email" className="font-bold">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    value={email}
                                    className="w-[350px] py-1 px-3 ml-3 smt:w-[230px]"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="phone" className="font-bold">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    name="phoneNumber"
                                    value={phone}
                                    className="w-[350px] py-1 px-3 ml-3 smt:w-[130px]"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <Button
                                    className=" float-right w-[100px] mt-3 smt:float-left"
                                    onClick={() => hanldleSubmit(user?._id)}
                                >
                                    Cập nhật
                                </Button>
                            </form>
                        </>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold mb-3">Thông tin người dùng</h2>
                            <div className="space-x-6">
                                <label>Name</label>
                                <div className="text-[14px] leading-10">{user?.name}</div>
                            </div>
                            <div className="space-x-6">
                                <label>Email</label>
                                <div className="text-[14px] leading-10">{user?.email}</div>
                            </div>
                            <div className="space-x-6">
                                <label>Phone</label>
                                <div className="text-[14px] leading-10">{user?.phoneNumber}</div>
                            </div>
                            <Button
                                className="float-right smt:float-left"
                                onClick={(e) => {
                                    setEdit(true);
                                    e.preventDefault();
                                }}
                            >
                                Edit
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function EditProfile() {
    const user = useSelector((state) => state.auth.user);
    const [edit, setEdit] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        setName(user?.name);
        setEmail(user?.email);
        setPhone(user?.phoneNumber);
    }, [user]);

    async function hanldleSubmit(id) {
        const token = localStorage.getItem('access_token')
        const response = await editUser({
            name: name,
            email: email,
            phoneNumber: phone,
        }, id, token)
    }

    return (
        <>
            <h2 className="text-xl font-bold mb-3 w-screen">Cập nhật thông tin</h2>

            <form className="flex flex-col">
                <label htmlFor="name" className="font-bold">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    value={name}
                    className="w-[350px] py-1 px-3 ml-3 smt:w-[130px]"
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="email" className="font-bold">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    value={email}
                    className="w-[350px] py-1 px-3 ml-3 smt:w-[230px]"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="phone" className="font-bold">
                    Phone
                </label>
                <input
                    id="phone"
                    name="phoneNumber"
                    value={phone}
                    className="w-[350px] py-1 px-3 ml-3 smt:w-[130px]"
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                    className=" float-right w-[100px] mt-3 smt:float-left"
                    onClick={() => hanldleSubmit(user?._id)}
                >
                    Cập nhật
                </Button>
            </form>
        </>
    ) }

function DefaultProfile() {
    const user = useSelector((state) => state.auth.user)
    return (
        <>
            <h2 className="text-xl font-bold mb-3">Thông tin người dùng</h2>
            <div className="space-x-6">
                <label>Name</label>
                <div className="text-[14px] leading-10">{user?.name}</div>
            </div>
            <div className="space-x-6">
                <label>Email</label>
                <div className="text-[14px] leading-10">{user?.email}</div>
            </div>
            <div className="space-x-6">
                <label>Phone</label>
                <div className="text-[14px] leading-10">{user?.phoneNumber}</div>
            </div>
            <Button
                className="float-right smt:float-left"
                onClick={(e) => {
                    setEdit(true);
                    e.preventDefault();
                }}
            >
                Edit
            </Button>
        </>
    ) }


export default Profile;
