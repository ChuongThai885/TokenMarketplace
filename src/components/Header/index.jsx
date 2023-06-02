import React from "react"
import { ConnectButton } from "web3uikit"
import { ReactComponent as LogoIcon } from "../../assets/logo.svg"
import { NavBar } from "../NavBar"
import { IconButton } from "../IconButton"
import { DocumentPlusIcon } from "@heroicons/react/24/outline"

export const Header = ({ isConnected, onCreateOrder }) => {
    return (
        <div className="w-full flex justify-between items-center border-b">
            <div className="flex text-2xl p-4 items-center">
                <div className="flex cursor-pointer items-center">
                    <LogoIcon className="w-7 h-7 mr-1.5" />
                    <span>Token Marketplace</span>
                </div>
                <NavBar />
            </div>
            <div className="flex items-center">
                {isConnected && (
                    <IconButton
                        className="w-8 h-8 text-black hover:text-default-dark-blue justify-center items-center px-2"
                        title="Add new order"
                        onClick={onCreateOrder}
                    >
                        <DocumentPlusIcon className="h-5 w-5" />
                    </IconButton>
                )}
                {/* <ConnectButton moralisAuth={false} /> */}
                <ConnectButton />
            </div>
        </div>
    )
}
