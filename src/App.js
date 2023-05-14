import "flowbite"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { MoralisProvider } from "react-moralis"
import { NoMatch } from "./pages/NoMatch"
import { DashBoard } from "./pages/Dashboard"

const router = createBrowserRouter([
    {
        path: "/",
        element: <DashBoard />,
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
                <RouterProvider router={router} />
            </MoralisProvider>
        </div>
    )
}

export default App
