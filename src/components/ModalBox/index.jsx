import clsx from "clsx"
import React from "react"
import { ReactComponent as CloseIcon } from "../../assets/close.svg"
import { IconButton } from "../IconButton"

export const ModalBox = ({
    id,
    className = "w-full",
    children,
    title,
    onClose,
}) => {
    return (
        <div
            id={id}
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
        >
            <div className="relative w-full h-full max-w-2xl md:h-auto">
                <div className="flex justify-center items-center">
                    <div
                        className={clsx(
                            "relative bg-white rounded-2xl shadow",
                            className
                        )}
                    >
                        {title && (
                            <div className="flex border-b p-5">
                                <label className="text-2xl font-bold">
                                    {title}
                                </label>
                                <IconButton
                                    className="text-default-dark-blue hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    onClick={onClose}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        )}
                        <div className="p-5">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
