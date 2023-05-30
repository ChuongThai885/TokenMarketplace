import { useWeb3Contract } from "react-moralis"

const OPTIONS = {
    abi: {},
    contractAddress: "",
    functionName: "",
    params: {},
}

export const useContractHOC = ({ contractAbi, contractAddress }) => {
    const defaultOptions = {
        ...OPTIONS,
        ...{ abi: contractAbi, contractAddress: contractAddress },
    }
    const { runContractFunction: _runContractFunction } = useWeb3Contract()

    const runContractFunction = async (options = { ...OPTIONS }) => {
        try {
            return await _runContractFunction({
                params: {
                    ...defaultOptions,
                    ...options,
                },
                throwOnError: true,
            })
        } catch (error) {
            return { error: error.message }
        }
    }
    return { runContractFunction }
}
