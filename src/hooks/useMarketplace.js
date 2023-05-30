import { useMoralis } from "react-moralis"
import { marketplaceAbi } from "../constants"
import { BigNumber } from "ethers"
import { useContractHOC } from "./useContractHOC"
import { useERC20Token } from "./useERC20Token"

export const useMarketplace = (marketplaceAddress) => {
    const { Moralis, account } = useMoralis()
    const { runContractFunction } = useContractHOC({
        contractAbi: marketplaceAbi,
        contractAddress: marketplaceAddress,
    })

    const { getDecimals, getAllowance, approveAllowance } = useERC20Token()

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

    const getSellOrder = async ({ userAddress, tokenAddress }) => {
        return await runContractFunction({
            functionName: "getSellOrder",
            params: {
                owner: userAddress,
                tokenAddress: tokenAddress,
            },
        })
    }

    const placeBuyOrder = async ({ tokenAddress, tokenAmount, totalPrice }) => {
        const amountInWei = Moralis.Units.Token(tokenAmount, 18)
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

    const getBuyOrder = async ({ userAddress, tokenAddress }) => {
        return await runContractFunction({
            functionName: "getBuyOrder",
            params: {
                owner: userAddress,
                tokenAddress: tokenAddress,
            },
        })
    }

    const cancelOrder = async (userAddress, tokenAddress, isBuyOrder) => {
        return await runContractFunction({
            functionName: "cancelOrder",
            params: {
                owner: userAddress,
                tokenAddress: tokenAddress,
                isBuyOrder: isBuyOrder,
            },
        })
    }

    return {
        placeSellOrder,
        getSellOrder,
        placeBuyOrder,
        getBuyOrder,
        cancelOrder,
    }
}
