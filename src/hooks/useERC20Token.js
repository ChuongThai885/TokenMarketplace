import { erc20Abi } from "../constants"
import { useContractHOC } from "./useContractHOC"

export const useERC20Token = () => {
    const { runContractFunction } = useContractHOC({ contractAbi: erc20Abi })

    const getDecimals = async (tokenAddress) => {
        return await runContractFunction({
            contractAddress: tokenAddress,
            functionName: "decimals",
        })
    }

    const getTokenName = async (tokenAddress) => {
        return await runContractFunction({
            contractAddress: tokenAddress,
            functionName: "name",
        })
    }

    const getTokenSymbol = async (tokenAddress) => {
        return await runContractFunction({
            contractAddress: tokenAddress,
            functionName: "symbol",
        })
    }

    const getAllowance = async ({
        tokenAddress = "",
        owner = "",
        spender = "",
    }) => {
        return await runContractFunction({
            contractAddress: tokenAddress,
            functionName: "allowance",
            params: {
                owner,
                spender,
            },
        })
    }

    const approveAllowance = async ({
        tokenAddress = "",
        spender = "",
        amount = "",
    }) => {
        return await runContractFunction({
            contractAddress: tokenAddress,
            functionName: "approve",
            params: {
                spender,
                amount,
            },
        })
    }

    return {
        getDecimals,
        getTokenName,
        getTokenSymbol,
        getAllowance,
        approveAllowance,
    }
}
