import React from "react"
import { ReactComponent as LogoIcon } from "../../assets/logo.svg"
import { NavLink } from "react-router-dom"

export const NoMatch = () => {
    return (
        <div className="flex w-full h-full min-h-screen justify-center items-center">
            <div className="flex flex-col items-center w-1/4">
                <LogoIcon className="w-8 h-8 mb-6" />
                <label className="text-xl font-bold mb-4">Page not found</label>
                <label className="text-center text-sm text-gray-500 mb-6">
                    The page could not be found. Click the button below to go
                    back to your dashboard.
                </label>
                <NavLink
                    to="/"
                    className="bg-default-dark-blue/75 hover:bg-default-dark-blue text-white font-bold text-sm px-6 py-3 rounded-lg"
                >
                    Go to Dashboard
                </NavLink>
            </div>
        </div>
    )
}
