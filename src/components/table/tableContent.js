"use client";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import Content from "./Content";
import { useSearchParams } from "next/navigation";

function TbContent() {
    const searchParams = useSearchParams();
    const search = searchParams.get("table");

    return (
        <div className="flex py-[50px] smt:flex-col">
            <div 
                className="w-[14%] smt:w-screen"
                style={{
                    position: 'fixed'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '50px'
                    }}
                >
                    <Link
                        style={{
                            paddingLeft: '40px',
                            fontSize: '18px'
                        }}

                        href={"/management?table=product"}
                        className={search === "product" ? "font-bold text-[#6d3f0a]" : ""}
                    >
                        Tất cả sản phẩm
                    </Link>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '50px'
                    }}
                >
                    <Link
                        style={{
                            paddingLeft: '40px',
                            fontSize: '18px'
                        }}
                        href={"/management?table=order"}
                        className={search === "order" ? "font-bold text-[#6d3f0a]" : ""}
                    >
                        Tất cả đơn order
                    </Link>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '50px'
                    }}
                >
                    <Link
                        style={{
                            paddingLeft: '40px',
                            fontSize: '18px'
                        }}
                        href={"/management?table=user"}
                        className={search === "user" ? "font-bold text-[#6d3f0a]": ""}
                    >
                        Tất cả user
                    </Link>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '50px'
                    }}
                >
                    <Link
                        style={{
                            paddingLeft: '40px',
                            fontSize: '18px'
                        }}
                        href={"/management?table=statistical"}
                        className={search === "statistical" ? "font-bold text-[#6d3f0a]" : ''}
                    >
                        Thống kê
                    </Link>
                </div>
            </div>
            <div
                style={{
                    marginLeft: '14%'
                }}
                className=" border-l-[1px] border-slate-900 smt:border-b-[1px] smt:mt-5"
            ></div>
            <Content search={search} />
            <ToastContainer />
        </div>
    );
}

export default TbContent;
