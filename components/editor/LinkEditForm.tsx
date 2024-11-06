'use client'

import { useEffect, useState } from "react";
import { FaUnlink } from "react-icons/fa";

interface LinkEditForm {
    onSubmitLinkForm(link: string): void,
    initialLinkValue: string
}

export function LinkEditForm({onSubmitLinkForm, initialLinkValue}: LinkEditForm) {
    const [linkValue, setLinkValue] = useState(initialLinkValue || "")
    useEffect(() => {
        if(initialLinkValue) {
            setLinkValue(initialLinkValue)
        }
    }, [initialLinkValue])
    return <div >
         <div className="p absolute top-10 z-50 border-2 border-gray-500 rounded flex gap-x-2">
            <input value = {linkValue} onChange={e => setLinkValue(e.target.value)} type = "text" placeholder="https://url.com" className="outline-none"/>
            <button className="p-1 border rounded bg-green-500 text-center text-white" onClick={() => {
                setLinkValue(linkValue)
                onSubmitLinkForm(linkValue)
            }}>ok</button>
            <button className="p-1 border rounded bg-red-400 text-white" onClick={() => {
                setLinkValue("")
                onSubmitLinkForm("")
            }}>
                <FaUnlink size={16}/>
            </button>
        </div>
    </div>
}