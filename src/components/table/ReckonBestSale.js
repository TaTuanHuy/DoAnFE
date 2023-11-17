"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { reckonBestSale } from "@/service/order";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function ReckonBestSale() {

    const tableRef = useRef(null);
    const [data, setData] = useState([])

    useEffect(() => {
        async function getData() {
            const response = await reckonBestSale();
            return setData(response);
        }
        getData()
    }, [])

    return (
        <>

            <DownloadTableExcel
                filename="reckon table"
                sheet="reckons"
                currentTableRef={tableRef.current}
            >
                <Button variant="none" className="bg-blue-500 text-white ">
                    Export excel
                </Button>
            </DownloadTableExcel>

            <div className="relative overflow-x-auto shadow-md smt:rounded-lg"
                style={{
                    maxHeight: '500px'
                }}
            >
                    <table
                        ref={tableRef}
                        className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto "
                    >
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3    text-center">
                                    Tên sản phẩm
                                </th>
                                <th scope="col" className="px-6 py-3   text-center ">
                                    Giá thành
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Số lượng còn lại
                                </th>
                                <th scope="col" className="px-6 py-3   text-center">
                                    Loại mặt hàng
                                </th>
                                <th scope="col" className="px-6 py-3  text-center">
                                    Số lượng đã bán 
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, i) => {
                                return (
                                    <tr key={item._id}>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.name}
                                        </th>
                                        <th
                                            scope="row"
                                            className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.price}
                                        </th>
                                        <th
                                            scope="row"
                                            className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.quantity}
                                        </th>
                                        <th
                                            scope="row"
                                            className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.type}
                                        </th>
                                        <th
                                            scope="row"
                                            className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.sale}
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

export default ReckonBestSale;
