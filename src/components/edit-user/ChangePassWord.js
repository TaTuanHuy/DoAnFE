"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";
import {updatePassWord} from "../../service/user"
import { useRouter } from "next/navigation";

function ChangePassWord() {
    const user = useSelector((state) => state.auth.user);
    const router = useRouter()

    const [oldPassWord, setOldPassWord] = useState("");
    const [newPassWord, setNewPassWord] = useState("");

    async function hanldleSubmit(id) {
        const token = localStorage.getItem('access_token')
        if(newPassWord.length < 6){
            setOldPassWord('')
            setNewPassWord('')
            return alert('Vui lòng nhập mật khẩu mới tối thiểu 6 kí tự')
        }
        const response = await updatePassWord(id, {
            old_password: oldPassWord,
            new_password: newPassWord
        }, token)   
        if(response.status === 403){
            setOldPassWord('')
            setNewPassWord('')
            return alert('Bạn đã nhập sai mật khẩu cũ! Vui lòng thử lại!')
        }
        alert('Thay đổi mật khẩu thành công! Vui lòng đăng nhập lại!')
        localStorage.clear()
        router.push('/signin')
    }

    return (
        <>
            <h2 className="text-xl font-bold mb-3 w-screen">Cập nhật mật khẩu</h2>

            <div className="flex flex-col">
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
                    value={oldPassWord}
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
                    value={newPassWord}
                    className="w-[350px] py-1 px-3 ml-3 smt:w-[230px]"
                    onChange={(e) => setNewPassWord(e.target.value)}
                />
                <Button
                    style={{
                        backgroundColor:'green'
                    }}
                    className=" float-right w-[100px] mt-3 smt:float-left"
                    onClick={() => hanldleSubmit(user?._id)}
                >
                    Cập nhật
                </Button>
            </div>
        </>
    ) }

export default ChangePassWord;
