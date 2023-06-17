import "flowbite"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { NoMatch } from "./pages/NoMatch"
import { DashBoard } from "./pages/Dashboard"
import { PersonalOrders } from "./pages/PersonalOrders"
import { MarketplaceProvider } from "./contexts/MarketplaceContext"
import { MoralisProvider } from "./contexts/MoralisContext"
import { NotificationProvider } from "./components/NotificationProvider"

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
            <MoralisProvider>
                <MarketplaceProvider>
                    <RouterProvider router={router} />
                    <NotificationProvider />
                </MarketplaceProvider>
            </MoralisProvider>
        </div>
    )
}

export default App
