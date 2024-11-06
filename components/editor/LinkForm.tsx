'use client'

import { LuLink } from "react-icons/lu";
import ToolBarButtons from "./ToolBarButtons";
import { useEffect, useState } from "react";

interface LinkFormProps {
    onSubmitLinkForm(link: string): void,
    initialLinkValue: string
}

export function LinkForm({onSubmitLinkForm, initialLinkValue}: LinkFormProps) {
    const [showForm, setShowForm] = useState(false)
    const [linkValue, setLinkValue] = useState(initialLinkValue || "")
    useEffect(() => {
        if(initialLinkValue) {
            setLinkValue(initialLinkValue)
        }
    }, [initialLinkValue])
    return <div >
        <ToolBarButtons onClick={() => setShowForm(!showForm)}>
            <LuLink size={20}/>
        </ToolBarButtons>
        {showForm && <div className="p-1 absolute top-10 z-50 border-2 border-gray-500 rounded flex gap-x-2">
            <input value = {linkValue} onChange={e => setLinkValue(e.target.value)} type = "text" placeholder="https://url.com" className="outline-none"/>
            <button className="px-1 border bg-red-400 text-white" onClick={() => {
                setLinkValue(linkValue)
                setShowForm(false)
                onSubmitLinkForm(linkValue)
            }}>ok</button>
        </div>}
    </div>
}