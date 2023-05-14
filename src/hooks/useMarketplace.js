import { useMoralis, useWeb3Contract } from "react-moralis"
import { marketplaceAbi, erc20Abi } from "../constants"
import { BigNumber, ethers } from "ethers"

export const useMarketplace = (marketplaceAddress) => {
    const { Moralis } = useMoralis()
    const { runContractFunction } = useWeb3Contract()

    const defaultOptions = {
        abi: marketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "",
        params: {},
    }

    const placeSellOrder = async ({
        tokenAddress,
        tokenAmount,
        totalPrice,
    }) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const tokenContract = new ethers.Contract(
            tokenAddress,
            erc20Abi,
            signer
        )
        const amountInWei = Moralis.Units.Token(tokenAmount, 18)
        const totalPriceInWei = Moralis.Units.ETH(totalPrice)
        const userAddress = await signer.getAddress()
        const allowance = await tokenContract.allowance(
            userAddress,
            marketplaceAddress
        )
        if (allowance.lt(amountInWei)) {
            const newAllowance = BigNumber.from(amountInWei).sub(allowance)
            await tokenContract.approve(marketplaceAddress, newAllowance)
        }

        await runContractFunction({
            params: {
                ...defaultOptions,
                ...{
                    functionName: "placeSellOrder",
                    params: {
                        tokenAddress: tokenAddress,
                        amount: amountInWei,
                        totalPrice: totalPriceInWei,
                    },
                },
            },
            onError: (error) => {
                console.log(error)
            },
            throwOnError: false,
        })
    }

    const getSellOrder = async ({ userAddress, tokenAddress }) => {
        const result = await runContractFunction({
            params: {
                ...defaultOptions,
                ...{
                    functionName: "getSellOrder",
                    params: {
                        owner: userAddress,
                        tokenAddress: tokenAddress,
                    },
                },
            },
            onError: (error) => {
                console.log(error)
            },
            throwOnError: false,
        })
        console.log(result)
    }

    const placeBuyOrder = async ({ tokenAddress, tokenAmount, totalPrice }) => {
        const amountInWei = Moralis.Units.Token(tokenAmount, 18)
        const totalPriceInWei = Moralis.Units.ETH(totalPrice)
        await runContractFunction({
            params: {
                ...defaultOptions,
                ...{
                    functionName: "placeBuyOrder",
                    params: {
                        tokenAddress: tokenAddress,
                        amount: amountInWei,
                    },
                    msgValue: totalPriceInWei,
                },
            },
            onError: (error) => {
                console.log(error)
            },
            throwOnError: false,
        })
    }

    const getBuyOrder = async ({ userAddress, tokenAddress }) => {
        const result = await runContractFunction({
            params: {
                ...defaultOptions,
                ...{
                    functionName: "getBuyOrder",
                    params: {
                        owner: userAddress,
                        tokenAddress: tokenAddress,
                    },
                },
            },
            onError: (error) => {
                console.log(error)
            },
            throwOnError: false,
        })
        console.log(result)
    }

    const cancelOrder = async (userAddress, tokenAddress, isBuyOrder) => {
        await runContractFunction({
            params: {
                ...defaultOptions,
                ...{
                    functionName: "cancelOrder",
                    params: {
                        owner: userAddress,
                        tokenAddress: tokenAddress,
                        isBuyOrder: isBuyOrder,
                    },
                },
            },
            onError: (error) => {
                console.log(error)
            },
            throwOnError: false,
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
