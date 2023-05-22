import React from "react"
import { Header } from "../Header"
import { useMoralis } from "react-moralis"
const supportedChain = ["31337"]

export const DefaultLayout = ({ children }) => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)

    return (
        <div className="w-full h-screen bg-gray-50">
            <Header />
            {isWeb3Enabled ? (
                <>
                    {supportedChain.includes(chainId.toString()) ? (
                        <>{children}</>
                    ) : (
                        <div className="w-full h-full flex text-xl justify-center pt-48">
                            {`Please switch to a supported chainId. The supported Chain Ids are: ${supportedChain}`}
                        </div>
                    )}
                </>
            ) : (
                <div className="w-full h-full flex text-xl justify-center pt-48">
                    Please connect to your Wallet
                </div>
            )}
        </div>
    )
}
