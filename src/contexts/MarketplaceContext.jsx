import { createContext, useContext } from "react"
import { useMarketplace } from "../hooks/useMarketplace"
import { MoralisContext } from "./MoralisContext"
import { useNotification } from "web3uikit"
import { NOTI_DEFAULT_OPTIONS } from "../utils/constant"

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

    return (
        <MarketplaceContext.Provider
            value={{
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
