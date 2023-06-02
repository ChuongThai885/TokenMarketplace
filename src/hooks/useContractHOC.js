import { ethers } from "ethers"
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
        let dataResponse
        await _runContractFunction({
            params: {
                ...defaultOptions,
                ...options,
            },
            onSuccess: (results) => {
                dataResponse = results
            },
            onError: (errors) => {
                dataResponse = {
                    error: errors?.data?.message || errors.message,
                }
            },
            throwOnError: false,
        })
        if (dataResponse.hash) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const tx = await provider.getTransaction(dataResponse.hash)
            dataResponse = await tx.wait()
        }
        return dataResponse
    }
    return { runContractFunction }
}
