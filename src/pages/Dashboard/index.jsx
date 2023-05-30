import { DefaultLayout } from "../../components/DefaultLayout"
import { useModal } from "../../hooks/useModal"
import React from "react"
import { OrderModal } from "./OrderModal"
import { useMoralis } from "react-moralis"
import { contractAddresses } from "../../constants"
import { useMarketplace } from "../../hooks/useMarketplace"

const PLACE_ORDER_MODAL_ID = "place-order-form"

export const DashBoard = () => {
    const { modal, triggerModal } = useModal()
    // const dispatch = useNotification()

    // const handleNewNotification = () => {
    //     dispatch({
    //         id: "custom_noti",
    //         type: "info",
    //         message: "Somebody messaged you",
    //         title: "New Notification",
    //         position: "topR",
    //     })
    // }

    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const marketplaceAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { placeSellOrder, placeBuyOrder } = useMarketplace(marketplaceAddress)

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
        <DefaultLayout>
            <button
                className="m-4 bg-blue-400 p-1 text-white"
                onClick={() => {
                    triggerModal({
                        targetId: PLACE_ORDER_MODAL_ID,
                    })
                }}
            >
                Place Order
            </button>

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
        </DefaultLayout>
    )
}
