'use client'

import { useStore } from "@/store/store"
import { useEffect } from "react"

export default function Modal() {
    const text = useStore(state => state.modalMessage)
    const clearText = useStore(state => state.setModalMessage)

    useEffect(() => {
        setTimeout(() => {
            clearText('')
        }, 5000);
    }, [])



    if (!text) return null
    return (
        <div className="absolute top-[5%] right-[2.5%] max-w-[300px] w-full h-16 rounded-sm bg-blue-400 text-white shadow-xl">
            <div className="relative flex justify-center items-center p-4 w-full h-full">
                <p className=" bg-white text-gray-700 cursor-pointer h-4 w-4 flex justify-start items-center absolute top-0 right-0 text-sm text-center" onClick={() => clearText('')}>X</p>
                <p className="text-xl font-semibold">
                    {text}
                </p>
            </div>
        </div>
    )
}
