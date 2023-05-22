import clsx from "clsx"
import React from "react"

export const ModalBox = ({ id, className, children }) => {
    return (
        <div
            id={id}
            tabIndex="-1"
            aria-hidden="true"
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full",
                className
            )}
        >
            <div className="relative w-full h-full max-w-md md:h-auto">
                <div className="relative bg-white rounded-2xl shadow dark:bg-gray-700 p-5 pt-7">
                    {children}
                </div>
            </div>
        </div>
    )
}
