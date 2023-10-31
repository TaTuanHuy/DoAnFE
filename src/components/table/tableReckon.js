"use client";
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css'

import ReckonTabDay from "./ReckonTabDay";
import ReckonTabRange from "./ReckonTabRange";

function TableReckon() {

    const tabs = ['days', 'month', 'range']
    const [reckonTab, setReckonTab] = useState(tabs[0])

    const changeReckonTab = (tab) => {
        setReckonTab(tab)
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
                })}
            </div>
            {
                reckonTab === 'days' && (
                    <ReckonTabDay />
                )
            }
            {
                reckonTab === 'range' && (
                    <ReckonTabRange />
                )
            }
        </>
    );
}

export default TableReckon;
