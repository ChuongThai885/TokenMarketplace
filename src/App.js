import "flowbite"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { NoMatch } from "./pages/NoMatch"
import { DashBoard } from "./pages/Dashboard"
import { PersonalOrders } from "./pages/PersonalOrders"
import { MoralisProvider } from "react-moralis"
import { MarketplaceProvider } from "./contexts/MarketplaceContext"
import { NotificationProvider } from "web3uikit"
import { MoralisProvider as CustomMoralisProvider } from "./contexts/MoralisContext"

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
            <MoralisProvider initializeOnMount={false}>
                <CustomMoralisProvider>
                    <MarketplaceProvider>
                        <RouterProvider router={router} />
                        <NotificationProvider />
                    </MarketplaceProvider>
                </CustomMoralisProvider>
            </MoralisProvider>
        </div>
    )
}

export default App
