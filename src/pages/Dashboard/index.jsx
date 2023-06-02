import { DefaultLayout } from "../../components/DefaultLayout"
import React, { useContext, useEffect, useState } from "react"
import { MarketplaceContext } from "../../contexts/MarketplaceContext"
import { MoralisContext } from "../../contexts/MoralisContext"
import { Blockie } from "web3uikit"

const TABLE_HEADERS = {
    address: { name: "Token Address" },
    tokenName: { name: "Token Name" },
    symbol: { name: "Token Symbol" },
    sellAmount: { name: "Sell Amount" },
    buyAmount: { name: "Buy Amount" },
    sellPrice: { name: "Sell Price" },
    buyPrice: { name: "Buy Price" },
}

export const DashBoard = () => {
    const [tokenOrders, setTokenOrders] = useState([])

    const { getTokensFeed } = useContext(MarketplaceContext)
    const { isWeb3Enabled } = useContext(MoralisContext)
    useEffect(() => {
        const fetchTokensFeedData = async () => {
            let orders = await getTokensFeed()
            setTokenOrders(orders)
        }
        if (isWeb3Enabled) {
            fetchTokensFeedData()
        }
    }, [isWeb3Enabled])

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
                                totalSellAmount,
                                totalBuyAmount,
                                priceSell,
                                priceBuy,
                            }) => (
                                <tr className="text-xs" key={tokenAddress}>
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
                                    <td className="px-5 py-3 whitespace-nowrap text-right">
                                        {totalSellAmount}
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap text-right">
                                        {totalBuyAmount}
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap text-right">
                                        {priceSell.toFixed(1)} ETH
                                    </td>
                                    <td className="px-5 py-3 whitespace-nowrap text-right">
                                        {priceBuy.toFixed(1)} ETH
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
