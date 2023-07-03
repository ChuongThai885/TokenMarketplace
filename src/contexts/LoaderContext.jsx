const { createContext, useState } = require("react")

export const LoaderContext = createContext()

export const LoaderProvider = ({ children }) => {
    const [isTransactionBeingProcessed, setIsTransactionBeingProcessed] =
        useState(false)
    return (
        <LoaderContext.Provider
            value={{
                isTransactionBeingProcessed,
                setIsTransactionBeingProcessed,
            }}
        >
            {children}
        </LoaderContext.Provider>
    )
}
