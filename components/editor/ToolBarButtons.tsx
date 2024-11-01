
import React, { ReactNode } from "react";
import clsx from "clsx";

interface ToolBarButtonProps {
    children: ReactNode,
    onClick?:() => void,
    active?: boolean
}

export default function ToolBarButtons({children, onClick, active}: ToolBarButtonProps):React.ReactNode {
    return <button onClick={onClick} 
        className={clsx('p-2', active? "bg-black text-white": "text-black")}>
        {children}
    </button>
}