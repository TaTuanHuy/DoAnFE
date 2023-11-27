"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {editUser} from "../../service/user"

function ChangePassWord() {
    const user = useSelector((state) => state.auth.user);

    const [oldPassWord, setOldPassWord] = useState("");
    const [newPassWord, setNewPassWord] = useState("");
    const [repeatNewPassWord, setRepeatNewPassWord] = useState("");

    // useEffect(() => {
    //     setName(user?.name);
    //     setEmail(user?.email);
    //     setPhone(user?.phoneNumber);
    // }, [user]);

    async function hanldleSubmit(id) {
        const token = localStorage.getItem('access_token')
        console.log("check")
        // const response = await editUser({
        //     name: name,
        //     email: email,
        //     phoneNumber: phone,
        // }, id, token)
    }

    return (
        <>
            <h2 className="text-xl font-bold mb-3 w-screen">Cập nhật mật khẩu</h2>

            <form className="flex flex-col">
                <label htmlFor="old-password" className="font-bold">
                    Mật khẩu cũ
                </label>
                <input
                    style={{
                        border: '1px solid',
                        borderRadius: '5px',
                        marginTop: '8px'
                    }}
                    type="password"
                    id="old-password"
                    name="old_password"
                    className="w-[350px] py-1 px-3 ml-3 smt:w-[130px]"
                    onChange={(e) => setOldPassWord(e.target.value)}
                />
                <label htmlFor="new_password" className="font-bold">
                    Mật khẩu mới
                </label>
                <input
                    style={{
                        border: '1px solid',
                        borderRadius: '5px',
                        marginTop: '8px'
                    }}
                    type="password"
                    id="new_password"
                    name="new_password"
                    className="w-[350px] py-1 px-3 ml-3 smt:w-[230px]"
                    onChange={(e) => setNewPassWord(e.target.value)}
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

export default ChangePassWord;
