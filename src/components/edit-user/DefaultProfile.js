"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
        </>
) }

export default DefaultProfile