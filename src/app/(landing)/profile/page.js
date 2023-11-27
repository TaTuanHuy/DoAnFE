"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {editUser} from "../../../service/user"
import EditProfile from "@/components/edit-user/EditProfile";
import DefaultProfile from "@/components/edit-user/DefaultProfile";
import ChangePassWord from "@/components/edit-user/ChangePassWord";

function Profile() {
    const user = useSelector((state) => state.auth.user);

    const [profile, changeProfile] = useState('default')

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
                    {profile === 'default' && <DefaultProfile />}
                    {profile === 'edit' && <EditProfile />}
                    {profile === 'edit-password' && <ChangePassWord />}
                    {
                        profile === 'edit' ? '' : 
                        <Button
                            style={{
                                marginTop: '10px'
                            }}
                            onClick={() => {
                                changeProfile('edit')
                            }}
                        >
                            Edit
                        </Button>
                    }
                    {
                        profile === 'edit-password' ? '' : 
                        <Button
                            style={{
                                marginTop: '10px',
                                marginLeft: '10px'
                            }}
                            onClick={() => {
                                changeProfile('edit-password')
                            }}
                        >
                            Edit PassWord
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}



export default Profile;
