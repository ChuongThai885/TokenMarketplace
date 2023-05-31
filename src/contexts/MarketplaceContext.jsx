import { createContext, useContext } from "react"
import { useMarketplace } from "../hooks/useMarketplace"
import { MoralisContext } from "./MoralisContext"

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

    return (
        <MarketplaceContext.Provider
            value={{
                placeSellOrder,
                placeBuyOrder,
                getTokensFeed,
                cancelOrder,
                getPersonalOrders,
            }}
        >
            {children}
        </MarketplaceContext.Provider>
    )
}
