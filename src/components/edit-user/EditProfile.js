"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {editUser} from "../../service/user"

function EditProfile() {
    const user = useSelector((state) => state.auth.user);

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
        if(name === ''){
            return alert('Bạn đã nhập để trống phần tên! Vui lòng thử lại')
        }
        if(email === ''){
             return alert('Bạn đã nhập để trống phần email! Vui lòng thử lại')
        }
        if(phone === '' || phone.length > 10){
             return alert('Bạn đã nhập sai số điện thoại! Vui lòng thử lại')
        }
        const response = await editUser({
            name: name,
            email: email,
            phoneNumber: phone,
        }, id, token)
        if(response.status === 400){
            return alert(response.message)
        }else{
            return alert(response.message)
        }
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
                    style={{
                        backgroundColor: 'green'
                    }}
                    className=" float-right w-[100px] mt-3 smt:float-left"
                    onClick={() => hanldleSubmit(user?._id)}
                >
                    Cập nhật
                </Button>
            </form>
        </>
    ) }

export default EditProfile;
