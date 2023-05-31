import React, { useContext } from "react"
import { Header } from "../Header"
import { useModal } from "../../hooks/useModal"
import { OrderModal } from "../../pages/Dashboard/OrderModal"
import { MarketplaceContext } from "../../contexts/MarketplaceContext"
import { MoralisContext } from "../../contexts/MoralisContext"

const SUPPORTTED_CHAIN = ["31337"]
const PLACE_ORDER_MODAL_ID = "place-order-form"

export const DefaultLayout = ({ children }) => {
    const { isWeb3Enabled, chainId } = useContext(MoralisContext)

    const { placeSellOrder, placeBuyOrder } = useContext(MarketplaceContext)

    const { modal, triggerModal } = useModal()

    const handlePlaceOrder = async ({
        tokenAddress,
        tokenAmount,
        totalPrice,
        isBuyOrder,
    }) => {
        if (isBuyOrder) {
            placeBuyOrder({
                tokenAddress,
                tokenAmount,
                totalPrice,
            })
        } else {
            placeSellOrder({
                tokenAddress,
                tokenAmount,
                totalPrice,
            })
        }
    }

    return (
        <div className="w-full h-screen bg-gray-50">
            <Header
                onCreateOrder={() => {
                    triggerModal({
                        targetId: PLACE_ORDER_MODAL_ID,
                    })
                }}
            />
            {isWeb3Enabled ? (
                <>
                    {SUPPORTTED_CHAIN.includes(chainId.toString()) ? (
                        <>{children}</>
                    ) : (
                        <div className="w-full h-full flex text-xl justify-center pt-48">
                            {`Please switch to a supported chainId. The supported Chain Ids are: ${SUPPORTTED_CHAIN}`}
                        </div>
                    )}
                </>
            ) : (
                <div className="w-full h-full flex text-xl justify-center pt-48">
                    Please connect to your Wallet
                </div>
            )}

            <OrderModal
                id={PLACE_ORDER_MODAL_ID}
                onCancel={() => {
                    modal.hide()
                }}
                onSubmit={({
                    tokenAddress,
                    tokenAmount,
                    price,
                    isBuyOrder,
                }) => {
                    modal.hide()
                    handlePlaceOrder({
                        tokenAddress,
                        tokenAmount,
                        totalPrice: price * tokenAmount,
                        isBuyOrder,
                    })
                }}
            />
        </div>
    )
}
