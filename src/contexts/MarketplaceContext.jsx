import { createContext, useContext } from "react"
import { useMarketplace } from "../hooks/useMarketplace"
import { MoralisContext } from "./MoralisContext"
import { useNotification } from "web3uikit"
import { NOTI_DEFAULT_OPTIONS } from "../utils/constant"
import { marketplaceAbi } from "../constants"
import { Contract, ethers } from "ethers"

export const MarketplaceContext = createContext()

export const MarketplaceProvider = ({ children }) => {
    const { marketplaceAddress } = useContext(MoralisContext)

    const {
        placeSellOrder,
        placeBuyOrder,
        getPersonalOrders,
        cancelOrder,
        getTokensFeed,
    } = useMarketplace(marketplaceAddress)

    const dispatch = useNotification()

    const emitNotification = (options = NOTI_DEFAULT_OPTIONS) => {
        dispatch({ ...NOTI_DEFAULT_OPTIONS, ...options })
    }

    const getMarketplaceContract = (marketplaceAddress) => {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
        return new Contract(marketplaceAddress, marketplaceAbi, web3Provider)
    }

    return (
        <MarketplaceContext.Provider
            value={{
                getMarketplaceContract,
                placeSellOrder,
                placeBuyOrder,
                getTokensFeed,
                cancelOrder,
                getPersonalOrders,
                emitNotification,
            }}
        >
            {children}
        </MarketplaceContext.Provider>
    )
}
