import { useContext, useEffect, useState } from "react"
import { DefaultLayout } from "../../components/DefaultLayout"
import { MarketplaceContext } from "../../contexts/MarketplaceContext"
import { MoralisContext } from "react-moralis"
import { Blockie } from "web3uikit"
import { IconButton } from "../../components/IconButton"
import { TrashIcon } from "@heroicons/react/24/outline"
import { MESSAGE, NOTI_TITLE, NOTI_TYPE } from "../../utils/constant"

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

    const { getPersonalOrders, cancelOrder, emitNotification } =
        useContext(MarketplaceContext)
    const { isWeb3Enabled } = useContext(MoralisContext)
    const fetchTokensFeedData = async () => {
        let orders = await getPersonalOrders()
        setTokenOrders(orders)
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            fetchTokensFeedData()
        }
    }, [isWeb3Enabled])

    const handleRemoveOrder = async (tokenAddress, isBuyOrder) => {
        const response = await cancelOrder({ tokenAddress, isBuyOrder })
        if (response.error) {
            emitNotification({
                type: NOTI_TYPE.SUCCESS,
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
                                            title="Remove Order"
                                            className="hover:text-default-dark-blue"
                                            onClick={() => {
                                                handleRemoveOrder(
                                                    tokenAddress,
                                                    isBuyOrder
                                                )
                                            }}
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
        </DefaultLayout>
    )
}
