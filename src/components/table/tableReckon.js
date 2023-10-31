"use client";
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css'

import ReckonTabDay from "./ReckonTabDay";
import ReckonTabRange from "./ReckonTabRange";

function TableReckon() {

    const tabs = ['Days', 'Month', 'Range']
    const [reckonTab, setReckonTab] = useState(tabs[0])

    const[checked, setCheck] = useState(reckonTab)

    const changeReckonTab = (tab) => {
        setCheck(tab)
        setReckonTab(tab)
    }

    const renderTab = (tab) => {
        return (
            <>
            
            </>
        )

    }


    return (
        <>
            <div
                style={{
                    border: '1px solid',
                }}
            >
                {tabs.map(tab => {
                    return (
                        <>
                            {
                                tab === checked
                                ? (
                                    <button
                                        className={tab}
                                        key={tab}
                                        style={{
                                            padding: '4px 20px 4px 21px',
                                            borderRight: '1px solid',
                                            margin: '2px 0',
                                            backgroundColor: "#97919161"
                                        }}
                                        onClick={() => changeReckonTab(tab)}
                                    >{tab}</button>
                                )
                                : (
                                    <button
                                        className={tab}
                                        key={tab}
                                        style={{
                                            padding: '4px 20px 4px 21px',
                                            borderRight: '1px solid',
                                            margin: '2px 0'
                                        }}
                                        onClick={() => changeReckonTab(tab)}
                                    >{tab}</button>
                                )

                            }
                        </>
                    )
                })}
            </div>
            {
                reckonTab === 'Days' && (
                    <ReckonTabDay />
                )
            }
            {
                reckonTab === 'Range' && (
                    <ReckonTabRange />
                )
            }
        </>
    );
}

export default TableReckon;
