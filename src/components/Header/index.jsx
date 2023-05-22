import React from "react"
import { ConnectButton } from "web3uikit"
export const Header = () => {
    return (
        <div className="w-full flex justify-between items-center shadow-lg">
            <p className="text-2xl p-4">Token Marketplace</p>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
