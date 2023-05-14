import { toast } from "react-toastify"

const Toast = () => {
    const toastConfig = {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }
    return {
        success: (message, config) => {
            toast.success(message, { ...toastConfig, ...config })
        },
        error: (message, config) => {
            toast.error(message, { ...toastConfig, ...config })
        },
    }
}

const customToast = Toast()

export default customToast
