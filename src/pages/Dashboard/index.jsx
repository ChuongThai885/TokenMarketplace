import { ConnectButton } from "web3uikit"
import { useMarketplace } from "../../hooks/useMarketplace"
import { useMoralis } from "react-moralis"
import { contractAddresses } from "../../constants"

export const DashBoard = () => {
    const { chainId: chainIdHex, account } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const marketplaceAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const { placeSellOrder, getSellOrder } = useMarketplace(marketplaceAddress)

    return (
        <div>
            Token Marketplace
            <ConnectButton moralisAuth={false} />
            <button
                onClick={() => {
                    placeSellOrder({
                        tokenAddress:
                            "0x5fbdb2315678afecb367f032d93f642f64180aa3",
                        tokenAmount: 20,
                        totalPrice: 100,
                    })

                    // getSellOrder({
                    //     userAddress: account,
                    //     tokenAddress:
                    //         "0x5fbdb2315678afecb367f032d93f642f64180aa3",
                    // })
                }}
            >
                Helooooo
            </button>
        </div>
    )
}
