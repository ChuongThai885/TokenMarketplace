import { useContext, useEffect, useState } from "react"
import { DefaultLayout } from "../../components/DefaultLayout"
import { MarketplaceContext } from "../../contexts/MarketplaceContext"
import { MoralisContext } from "../../contexts/MoralisContext"
import { Blockie } from "web3uikit"
import { IconButton } from "../../components/IconButton"
import { TrashIcon } from "@heroicons/react/24/outline"
import {
    MARKETPLACE_EVENT,
    MESSAGE,
    NOTI_TITLE,
    NOTI_TYPE,
} from "../../utils/constant"
import { loader } from "../../components/Loader"
import { useModal } from "../../hooks/useModal"
import { DeleteModal } from "../../components/ModalBox/DeleteModal"
import { LoaderContext } from "../../contexts/LoaderContext"

const DELETE_ORDER_MODAL_ID = "delete-modal"

const TABLE_HEADERS = {
    address: { name: "Token Address" },
    tokenName: { name: "Token Name" },
    symbol: { name: "Token Symbol" },
    amount: { name: "Amount" },
    price: { name: "Price" },
    type: { name: "Type" },
    setting: { name: "" },
}

export const PersonalOrders = () => {
    const [tokenOrders, setTokenOrders] = useState([])
    const [orderSelected, setOrderSelected] = useState({
        tokenAddress: "",
        isBuyOrder: false,
    })

    const {
        getMarketplaceContract,
        getPersonalOrders,
        cancelOrder,
        emitNotification,
    } = useContext(MarketplaceContext)
    const { isWeb3Enabled, marketplaceAddress, account } =
        useContext(MoralisContext)
    const { isTransactionBeingProcessed, setIsTransactionBeingProcessed } =
        useContext(LoaderContext)

    const { modal, triggerModal } = useModal()

    const handleRemoveOrder = async (tokenAddress, isBuyOrder) => {
        loader.emit("start")
        setIsTransactionBeingProcessed(true)
        const response = await cancelOrder({ tokenAddress, isBuyOrder })
        loader.emit("stop")
        setIsTransactionBeingProcessed(false)

        if (response.error) {
            emitNotification({
                type: NOTI_TYPE.ERROR,
                title: NOTI_TITLE.DELETE_ORDER_ERROR,
                message: response.error,
            })
            return
        }
        emitNotification({
            type: NOTI_TYPE.SUCCESS,
            title: NOTI_TITLE.DELETE_ORDER_SUCCESS,
            message: MESSAGE.DELETE_ORDER_SUCCESS,
        })
        fetchTokensFeedData()
    }

    const fetchTokensFeedData = async () => {
        let orders = await getPersonalOrders()
        setTokenOrders(orders)
    }

    const handleEventEmited = (owner) => {
        if (owner.toLowerCase() !== account) return
        fetchTokensFeedData()
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            fetchTokensFeedData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isWeb3Enabled])

    useEffect(() => {
        if (!marketplaceAddress) return

        const marketplaceContract = getMarketplaceContract(marketplaceAddress)

        marketplaceContract.on(
            MARKETPLACE_EVENT.ORDER_PLACED,
            handleEventEmited
        )

        marketplaceContract.on(
            MARKETPLACE_EVENT.ORDER_MATCHED,
            handleEventEmited
        )

        return () => {
            marketplaceContract.off(
                MARKETPLACE_EVENT.ORDER_PLACED,
                handleEventEmited
            )

            marketplaceContract.off(
                MARKETPLACE_EVENT.ORDER_MATCHED,
                handleEventEmited
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [marketplaceAddress])

    return (
        <DefaultLayout>
            <div className="w-full h-full flex flex-col items-center bg-gray-100">
                <table className="w-11/12 divide-y divide-gray-200">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            {Object.entries(TABLE_HEADERS).map(
                                ([id, { name }]) => (
                                    <th
                                        key={id}
                                        className="px-5 py-3 text-left text-sm font-medium text-slate-700 uppercase tracking-wider"
                                    >
                                        {name}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tokenOrders.map(
                            ({
                                tokenAddress,
                                tokenName,
                                tokenSymbol,
                                amount,
                                price,
                                isBuyOrder,
                            }) => (
                                <tr
                                    key={`${tokenAddress}_${isBuyOrder}`}
                                    className="text-xs"
                                >
                                    <td className="flex px-5 py-3 whitespace-nowrap items-center">
                                        <div className="mr-2">
                                            <Blockie
                                                seed={tokenAddress}
                                                size={7}
                                            />
                                        </div>
                                        {tokenAddress}
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap">
                                        {tokenName}
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap">
                                        {tokenSymbol}
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap">
                                        {amount}
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap">
                                        {price} ETH
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap">
                                        {isBuyOrder ? "Buy" : "Sell"}
                                    </td>
                                    <td>
                                        <IconButton
                                            title={
                                                isTransactionBeingProcessed
                                                    ? "Your transaction is being processed"
                                                    : "Remove Order"
                                            }
                                            className="hover:text-default-dark-blue disabled:hover:text-black disabled:cursor-not-allowed"
                                            onClick={() => {
                                                setOrderSelected({
                                                    tokenAddress,
                                                    isBuyOrder,
                                                })
                                                triggerModal({
                                                    targetId:
                                                        DELETE_ORDER_MODAL_ID,
                                                })
                                            }}
                                            disabled={
                                                isTransactionBeingProcessed
                                            }
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </IconButton>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            <DeleteModal
                modalProps={{ id: DELETE_ORDER_MODAL_ID, className: "w-2/3" }}
                onCancel={() => modal.hide()}
                onDelete={() => {
                    modal.hide()
                    handleRemoveOrder(
                        orderSelected.tokenAddress,
                        orderSelected.isBuyOrder
                    )
                }}
            />
        </DefaultLayout>
    )
}
