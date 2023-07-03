import React, { useEffect, useRef, useState } from "react"
import ReactLoadingBar from "react-top-loading-bar"

export const loader = {
    events: {},
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = callback
        }
    },
    off(eventName) {
        delete this.events[eventName]
    },
    emit(eventName) {
        if (!this.events[eventName]) return
        this.events[eventName]()
    },
}

export const LoadingBar = () => {
    const [show, setShow] = useState(undefined)
    const ref = useRef(null)

    useEffect(() => {
        loader.on("start", () => setShow(true))
        loader.on("stop", () => setShow(false))

        return () => {
            loader.off("start")
            loader.off("stop")
        }
    }, [])

    useEffect(() => {
        if (show === undefined) return
        if (show) {
            ref.current.continuousStart()
        } else {
            ref.current.complete()
        }
    }, [show])

    return <ReactLoadingBar color="#FF6699" ref={ref} />
}
