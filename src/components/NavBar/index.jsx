import React from "react"
import { NavLink } from "react-router-dom"

const PAGES = {
    dashboard: { name: "Dashboard", url: "/" },
    personalOrders: { name: "Personal Orders", url: "/orders" },
}

export const NavBar = () => {
    return (
        <ul className="flex justify-between max-w-7xl pl-4 text-xl">
            {Object.entries(PAGES).map(([id, { name, url }]) => (
                <li key={id}>
                    <NavLink
                        to={url}
                        className="text-slate-800 hover:text-default-dark-blue font-medium rounded-md px-4 py-1"
                    >
                        {name}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}
