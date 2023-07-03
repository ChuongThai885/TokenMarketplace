import React from "react"
import { ConnectButton } from "web3uikit"
import { ReactComponent as LogoIcon } from "../../assets/logo.svg"
import { NavBar } from "../NavBar"
import { IconButton } from "../IconButton"
import { DocumentPlusIcon } from "@heroicons/react/24/outline"
import { useContext } from "react"
import { LoaderContext } from "../../contexts/LoaderContext"

export const Header = ({ isConnected, onCreateOrder }) => {
    const { isTransactionBeingProcessed } = useContext(LoaderContext)
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
                        className="w-8 h-8 text-black hover:text-default-dark-blue disabled:cursor-not-allowed disabled:hover:text-black justify-center items-center px-2"
                        title={
                            isTransactionBeingProcessed
                                ? "Your transaction is being processed"
                                : "Add new order"
                        }
                        onClick={onCreateOrder}
                        disabled={isTransactionBeingProcessed}
                    >
                        <DocumentPlusIcon className="h-5 w-5" />
                    </IconButton>
                )}
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
