import { useModal } from "../../hooks/useModal"
import { ModalBox } from "../../components/ModalBox"
import { DefaultLayout } from "../../components/DefaultLayout"

const PLACE_ORDER_MODAL_ID = "place-order-form"

export const DashBoard = () => {
    const { triggerModal } = useModal()

    return (
        <DefaultLayout>
            <button
                className="mt-2 bg-rose-400 p-1 text-white"
                onClick={() => {
                    triggerModal({
                        targetId: PLACE_ORDER_MODAL_ID,
                    })
                    // placeSellOrder({
                    //     tokenAddress:
                    //         "0x5fbdb2315678afecb367f032d93f642f64180aa3",
                    //     tokenAmount: 20,
                    //     totalPrice: 100,
                    // })
                    // getSellOrder({
                    //     userAddress: account,
                    //     tokenAddress:
                    //         "0x5fbdb2315678afecb367f032d93f642f64180aa3",
                    // })
                }}
            >
                Dashboard
            </button>
            <ModalBox id={PLACE_ORDER_MODAL_ID}>
                <input placeholder="Name here" />
            </ModalBox>
        </DefaultLayout>
    )
}
