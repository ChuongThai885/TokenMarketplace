import React, { useContext, useEffect } from "react"
import { MoralisContext } from "../../contexts/MoralisContext"
import { MarketplaceContext } from "../../contexts/MarketplaceContext"
import { useERC20Token } from "../../hooks/useERC20Token"
import { MARKETPLACE_EVENT, NOTI_TITLE, NOTI_TYPE } from "../../utils/constant"

export const NotificationProvider = () => {
    const { marketplaceAddress, account } = useContext(MoralisContext)
    const { getMarketplaceContract, emitNotification } =
        useContext(MarketplaceContext)
    const { getTokenSymbol } = useERC20Token()

    const handleOrderMatched = async (
        owner,
        traderMatched,
        tokenAddress,
        amount,
        price,
        isBuyOrder,
        timestamp
    ) => {
        if (
            owner.toLowerCase() !== account &&
            traderMatched.toLowerCase() !== account
        )
            return

        const typeOrder =
            owner.toLowerCase() === account && isBuyOrder ? "buy" : "sell"
        const tokenSymbol = await getTokenSymbol(tokenAddress)
        const message = `Your order to ${typeOrder} ${tokenSymbol} tokens has been successfully matched, please check your wallet balance`

        emitNotification({
            id: timestamp.toString(),
            type: NOTI_TYPE.SUCCESS,
            title: NOTI_TITLE.ORDER_MATCHED,
            message,
        })
    }

    useEffect(() => {
        if (!marketplaceAddress) return
        const marketplaceContract = getMarketplaceContract(marketplaceAddress)

        marketplaceContract.on(
            MARKETPLACE_EVENT.ORDER_MATCHED,
            handleOrderMatched
        )

        return () => {
            marketplaceContract.off(
                MARKETPLACE_EVENT.ORDER_MATCHED,
                handleOrderMatched
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [marketplaceAddress])

    return <></>
}
