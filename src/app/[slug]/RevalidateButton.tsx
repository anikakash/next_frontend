'use client'

import { usePathname } from "next/navigation";
import { handleAction } from "./action";

const RevalidateButton = () => {

    const pathname = usePathname();
    const handleClick = () =>{
        handleAction(pathname)
    }
    return (
        <>
        <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Refresh
        </button>
        </>
    )
}

export default RevalidateButton;