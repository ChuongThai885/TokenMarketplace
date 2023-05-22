import { Modal } from "flowbite"
import { useState } from "react"

export const useModal = () => {
    const defaultOptions = {
        backdrop: "dynamic",
        backdropClasses:
            "bg-gray-900 bg-opacity-50 dark:bg-opacity-50 fixed inset-0 z-40",
        closable: true,
    }

    const [modal, setModal] = useState(undefined)
    const [modalOptions, setModalOptions] = useState({
        targetId: "",
    })

    const createModal = ({ targetId, options }) => {
        if (!targetId) return
        const $targetEl = document.getElementById(targetId)
        if (!$targetEl) return {}
        const newModal = new Modal($targetEl, { ...defaultOptions, ...options })
        return newModal
    }

    const triggerModal = ({ targetId, options = {} }) => {
        if (modalOptions.targetId === targetId) {
            modal.show()
            return
        }
        setModalOptions({ targetId: targetId })
        const newModal = createModal({ targetId, options })
        newModal.show()
        setModal(newModal)
    }

    return { modal, triggerModal }
}
