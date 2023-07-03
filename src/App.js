import "flowbite"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { NoMatch } from "./pages/NoMatch"
import { DashBoard } from "./pages/Dashboard"
import { PersonalOrders } from "./pages/PersonalOrders"
import { MarketplaceProvider } from "./contexts/MarketplaceContext"
import { MoralisProvider } from "./contexts/MoralisContext"
import { NotificationProvider } from "./components/NotificationProvider"
import { LoadingBar } from "./components/Loader"
import { LoaderProvider } from "./contexts/LoaderContext"

const router = createBrowserRouter([
    {
        path: "/",
        element: <DashBoard />,
    },
    {
        path: "/orders",
        element: <PersonalOrders />,
    },
    {
        path: "*",
        element: <NoMatch />,
    },
])

function App() {
    return (
        <div className="App">
            <LoadingBar />
            <LoaderProvider>
                <MoralisProvider>
                    <MarketplaceProvider>
                        <RouterProvider router={router} />
                        <NotificationProvider />
                    </MarketplaceProvider>
                </MoralisProvider>
            </LoaderProvider>
        </div>
    )
}

export default App
