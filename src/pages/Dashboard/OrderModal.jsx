import React, { useCallback, useState } from "react"
import { ModalBox } from "../../components/ModalBox"
import _ from "lodash"
import { useERC20Token } from "../../hooks/useERC20Token"

const TOKEN_DATA = {
    address: "",
    name: "",
    symbol: "",
}

export const OrderModal = ({ id, onCancel, onSubmit }) => {
    const [tokenData, setTokenData] = useState(TOKEN_DATA)
    const [numTokens, setNumTokens] = useState(1)
    const [price, setPrice] = useState("")
    const [isBuyOrder, setIsBuyOrder] = useState(true)
    const [error, setError] = useState("")
    const { getTokenName, getTokenSymbol } = useERC20Token()

    const checkTokenValidity = async (address) => {
        const [tokenName, tokenSymbol] = await Promise.all([
            getTokenName(address),
            getTokenSymbol(address),
        ])
        if (tokenName.error && tokenSymbol.error) {
            setError("Error: Token not exist")
            setTokenData({
                ...TOKEN_DATA,
                ...{ address },
            })
        } else {
            setTokenData({ address, name: tokenName, symbol: tokenSymbol })
            setError("")
        }
    }

    const debouncedLog = useCallback(
        _.debounce((address) => {
            checkTokenValidity(address)
        }, 1000),
        []
    )

    const clearDataForm = () => {
        setTokenData(TOKEN_DATA)
        setNumTokens(1)
        setPrice("")
        setIsBuyOrder(true)
        setError("")
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        clearDataForm()
        onSubmit({
            tokenAddress: tokenData.address,
            tokenAmount: numTokens,
            price,
            isBuyOrder,
        })
    }

    const handleCancel = () => {
        clearDataForm()
        onCancel()
    }

    const handleTokenAddressChange = (newAddress) => {
        setTokenData({
            ...tokenData,
            ...{
                address: newAddress,
                name: "",
                symbol: "",
            },
        })
        setError("")
        debouncedLog(newAddress)
    }

    const handleTypeChange = (event) => {
        const newValue = event.target.value === "true"
        setIsBuyOrder(newValue)
    }

    const isValidToken = tokenData.name !== "" && tokenData.symbol !== ""

    return (
        <ModalBox id={id} onClose={handleCancel} title="Place Order">
            <form onSubmit={handleSubmit}>
                <label className="block mb-2 font-bold text-gray-700">
                    Token Address
                </label>
                <div className="relative">
                    <input
                        type="text"
                        className="block w-full px-4 py-2 mb-7 leading-tight border border-gray-300 rounded appearance-none focus:outline-none focus:bg-white"
                        placeholder="Enter Token Address"
                        value={tokenData.address}
                        onChange={(event) => {
                            handleTokenAddressChange(event.target.value)
                        }}
                        required
                    />
                    {tokenData.address !== "" && (
                        <div className="absolute w-full text-sm top-11">
                            {error !== "" && (
                                <label className="text-red-400">{error}</label>
                            )}
                            {isValidToken && (
                                <div className="flex justify-between text-green-400">
                                    <label>
                                        Token Name:
                                        <span className="ml-2.5">
                                            {tokenData.name}
                                        </span>
                                    </label>
                                    <label>
                                        Token Symbol:
                                        <span className="ml-2.5">
                                            {tokenData.symbol}
                                        </span>
                                    </label>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <label className="block mb-2 font-bold text-gray-700">
                    Number of Tokens
                </label>
                <input
                    type="number"
                    className="block w-full px-4 py-2 mb-4 leading-tight border border-gray-300 rounded appearance-none focus:outline-none focus:bg-white"
                    placeholder="Enter Number of Tokens"
                    value={numTokens}
                    onChange={(event) => setNumTokens(event.target.value)}
                    step="1"
                    min="1"
                    required
                />

                <label className="block mb-2 font-bold text-gray-700">
                    Price
                </label>
                <input
                    type="number"
                    className="block w-full px-4 py-2 mb-4 leading-tight border border-gray-300 rounded appearance-none focus:outline-none focus:bg-white"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                />

                <label className="block mb-2 font-boldtext-gray-700">
                    Order Type
                </label>
                <div className="inline-block relative w-full mb-4">
                    <select
                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        value={isBuyOrder}
                        onChange={handleTypeChange}
                    >
                        <option value={true}>Buy</option>
                        <option value={false}>Sell</option>
                    </select>
                </div>

                <div className="mt-2">
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="px-4 py-2 font-bold text-slate-500 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:shadow-outline"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 font-bold text-white bg-default-dark-blue/75 hover:bg-default-dark-blue disabled:bg-default-light-blue disabled:text-slate-500 rounded focus:outline-none focus:shadow-outline"
                            disabled={!isValidToken}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </form>
        </ModalBox>
    )
}
