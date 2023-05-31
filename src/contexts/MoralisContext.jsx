import { createContext } from "react"
import { useMoralis } from "react-moralis"
import { contractAddresses } from "../constants"

export const MoralisContext = createContext()

export const MoralisProvider = ({ children }) => {
    const {
        chainId: chainIdHex,
        isWeb3Enabled,
        Moralis,
        account,
    } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const marketplaceAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    return (
        <MoralisContext.Provider
            value={{
                Moralis,
                isWeb3Enabled,
                chainId,
                marketplaceAddress,
                account,
            }}
        >
            {children}
        </MoralisContext.Provider>
    )
}
