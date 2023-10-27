import {
    BrowserRouter,
    Navigate,
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
} from 'react-router-dom'
import GlobalStyles from './styles/GlobalStyles'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Cabins from './pages/Cabins'
import Users from './pages/Users'
import Settings from './pages/Settings'
import Account from './pages/Account'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './ui/AppLayout'

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/bookings',
                element: <Bookings />,
            },
            {
                path: '/cabins',
                element: <Cabins />,
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/settings',
                element: <Settings />,
            },
            {
                path: '/account',
                element: <Account />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
])

function App() {
    return (
        <>
            <GlobalStyles />
            <RouterProvider router={router} />
        </>
    )
}

export default App

// INNA WERSJA //

//  {/* <BrowserRouter>
//                 <Routes>
//                     {/* index przekierowuje nas od razu na dashboard jeśli nie mamy appLayout */}
//                     <Route
//                         index
//                         element={<Navigate replace to="dashboard" />}
//                     />
//                     <Route path="dashboard" element={<Dashboard />} />
//                     <Route path="bookings" element={<Bookings />} />
//                     <Route path="cabins" element={<Cabins />} />
//                     <Route path="users" element={<Users />} />
//                     <Route path="settings" element={<Settings />} />
//                     <Route path="account" element={<Account />} />
//                     <Route path="login" element={<Login />} />
//                     <Route path="*" element={<PageNotFound />} />
//                 </Routes>
//             </BrowserRouter> */}
