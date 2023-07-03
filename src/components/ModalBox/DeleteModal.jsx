import React from "react"
import { ModalBox } from "."

export const DeleteModal = ({ modalProps, onCancel, onDelete }) => {
    return (
        <ModalBox {...modalProps}>
            <div className="pb-5 space-y-3 text-center">
                <div className="font-bold text-xl">
                    Are you sure you want to remove order?
                </div>
                <div className="font-medium text-sm">
                    This action cannot be undone!
                </div>
            </div>
            <div className="flex items-center space-x-3 rounded-b">
                <button
                    type="button"
                    className="w-full text-slate-500 bg-white hover:bg-gray-200 focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    className="w-full text-white bg-red-600 hover:bg-red-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </ModalBox>
    )
}
