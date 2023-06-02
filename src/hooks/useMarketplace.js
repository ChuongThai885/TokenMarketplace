import { marketplaceAbi } from "../constants"
import { BigNumber } from "ethers"
import { useContractHOC } from "./useContractHOC"
import { useERC20Token } from "./useERC20Token"
import { useContext } from "react"
import { MoralisContext } from "../contexts/MoralisContext"

export const useMarketplace = (marketplaceAddress) => {
    const { Moralis, account } = useContext(MoralisContext)
    const { runContractFunction } = useContractHOC({
        contractAbi: marketplaceAbi,
        contractAddress: marketplaceAddress,
    })

    const {
        getTokenName,
        getTokenSymbol,
        getDecimals,
        getAllowance,
        approveAllowance,
    } = useERC20Token()

    const placeSellOrder = async ({
        tokenAddress,
        tokenAmount,
        totalPrice,
    }) => {
        const amountInWei = Moralis.Units.Token(
            tokenAmount,
            await getDecimals(tokenAddress)
        )
        const totalPriceInWei = Moralis.Units.ETH(totalPrice)
        const allowance = await getAllowance({
            tokenAddress,
            owner: account,
            spender: marketplaceAddress,
        })

        if (allowance.lt(amountInWei)) {
            const newAllowance = BigNumber.from(amountInWei).sub(allowance)
            await approveAllowance({
                tokenAddress,
                spender: marketplaceAddress,
                amount: newAllowance,
            })
        }

        return await runContractFunction({
            functionName: "placeSellOrder",
            params: {
                tokenAddress: tokenAddress,
                amount: amountInWei,
                totalPrice: totalPriceInWei,
            },
        })
    }

    const getDetailOrder = async (index, isBuyOrder, userAddress) => {
        const userOrder = await getUserOrder(index, isBuyOrder)
        if (userOrder.owner.toLowerCase() !== userAddress && userAddress) return

        const [tokenName, tokenSymbol, order] = await Promise.all([
            getTokenName(userOrder.tokenAddress),
            getTokenSymbol(userOrder.tokenAddress),
            getOrder({
                userAddress: userOrder.owner,
                tokenAddress: userOrder.tokenAddress,
                isBuyOrder,
            }),
        ])
        return {
            tokenAddress: userOrder.tokenAddress,
            tokenName,
            tokenSymbol,
            amount: Moralis.Units.FromWei(
                order.amount,
                await getDecimals(userOrder.tokenAddress)
            ),
            price: Moralis.Units.FromWei(order.price),
            isBuyOrder,
        }
    }

    const getAllOrderDetail = async (isBuyOrder, userAddress) => {
        const orderCount = await runContractFunction({
            functionName: isBuyOrder ? "getBuyOrderCount" : "getSellOrderCount",
        })
        let ordersPromise = []
        if (orderCount.error) return ordersPromise
        Array.from({ length: orderCount.toNumber() }, (_, i) => {
            ordersPromise.push(getDetailOrder(i, isBuyOrder, userAddress))
        })
        return await Promise.all(ordersPromise)
    }

    const getPersonalOrders = async () => {
        const [buyOrders, sellOrders] = await Promise.all([
            getAllOrderDetail(true, account),
            getAllOrderDetail(false, account),
        ])
        return [...buyOrders, ...sellOrders].filter(
            (order) => order !== undefined
        )
    }

    const getTokensFeed = async () => {
        const [buyOrders, sellOrders] = await Promise.all([
            getAllOrderDetail(true),
            getAllOrderDetail(false),
        ])
        const listOrders = [...buyOrders, ...sellOrders].filter(
            (order) => order !== undefined
        )
        return Object.values(
            listOrders.reduce((accumulator, entry) => {
                const {
                    tokenSymbol,
                    amount,
                    isBuyOrder,
                    price,
                    tokenAddress,
                    tokenName,
                } = entry
                const key = tokenAddress

                if (!accumulator[key]) {
                    accumulator[key] = {
                        tokenAddress,
                        tokenSymbol,
                        tokenName,
                        totalSellAmount: 0,
                        totalBuyAmount: 0,
                        priceSell: 0,
                        priceBuy: 0,
                    }
                }
                const group = accumulator[key]

                if (isBuyOrder) {
                    group.totalBuyAmount += parseInt(amount)
                    group.priceBuy =
                        (group.priceBuy * (group.totalBuyAmount - amount) +
                            parseFloat(price) * amount) /
                        group.totalBuyAmount
                } else {
                    group.totalSellAmount += parseInt(amount)
                    group.priceSell =
                        (group.priceSell * (group.totalSellAmount - amount) +
                            parseFloat(price) * amount) /
                        group.totalSellAmount
                }
                return accumulator
            }, {})
        )
    }

    const getUserOrder = async (index, isBuyOrder) => {
        return await runContractFunction({
            functionName: "getUserOrder",
            params: {
                orderIndex: index,
                isBuyOrder,
            },
        })
    }

    const getOrder = async ({ userAddress, tokenAddress, isBuyOrder }) => {
        return await runContractFunction({
            functionName: isBuyOrder
                ? "getDetailBuyOrder"
                : "getDetailSellOrder",
            params: {
                owner: userAddress,
                tokenAddress: tokenAddress,
            },
        })
    }

    const placeBuyOrder = async ({ tokenAddress, tokenAmount, totalPrice }) => {
        const amountInWei = Moralis.Units.Token(
            tokenAmount,
            await getDecimals(tokenAddress)
        )
        const totalPriceInWei = Moralis.Units.ETH(totalPrice)
        return await runContractFunction({
            functionName: "placeBuyOrder",
            params: {
                tokenAddress: tokenAddress,
                amount: amountInWei,
            },
            msgValue: totalPriceInWei,
        })
    }

    const cancelOrder = async ({ tokenAddress, isBuyOrder }) => {
        return await runContractFunction({
            functionName: "cancelOrder",
            params: {
                owner: account,
                tokenAddress: tokenAddress,
                isBuyOrder: isBuyOrder,
            },
        })
    }

    return {
        placeSellOrder,
        placeBuyOrder,
        getTokensFeed,
        getPersonalOrders,
        cancelOrder,
    }
}
