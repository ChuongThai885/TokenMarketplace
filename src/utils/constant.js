export const SUPPORTTED_CHAIN = ["31337"]

export const NOTI_TYPE = {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error",
}

export const NOTI_POSITION = {
    TOP_RIGHT: "topR",
    TOP_LEFT: "topL",
    BOTTOM_RIGHT: "bottomR",
    BOTTOM_LEFT: "bottomL",
}

export const NOTI_TITLE = {
    DEFAULT: "Notification",
    PLACE_ORDER_SUCCESS: "Order placed",
    PLACE_ORDER_ERROR: "Error place order",
    DELETE_ORDER_SUCCESS: "Order deleted",
    DELETE_ORDER_ERROR: "Error delete order",
}

export const MESSAGE = {
    DEFAULT_NOTI: "New Notification",
    PLACE_ORDER_SUCCESS: "Placed order successfully",
    DELETE_ORDER_SUCCESS: "Deleted order successfully",
}

export const NOTI_DEFAULT_OPTIONS = {
    id: "",
    type: NOTI_TYPE.INFO,
    message: MESSAGE.DEFAULT_NOTI,
    title: NOTI_TITLE.DEFAULT,
    position: NOTI_POSITION.TOP_RIGHT,
}
