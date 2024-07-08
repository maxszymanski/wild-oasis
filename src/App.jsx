import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import GlobalStyles from './styles/GlobalStyles'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Booking from './pages/Booking'
import Cabins from './pages/Cabins'
import Users from './pages/Users'
import Settings from './pages/Settings'
import Account from './pages/Account'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './ui/AppLayout'
import { Toaster } from 'react-hot-toast'
import Checkin from './pages/Checkin'
import ProtectedRoute from './ui/ProtectedRoute'
import { DarkModeProvider } from './context/DarkModeContext'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ui/ErrorFallback'

// towrzymy nowy React Query. queries: po jakim czasie ma się aktualizować
const queryClient = new QueryClient({
    queries: {
        staleTime: 60 * 1000,
    },
})

const router = createBrowserRouter([
    {
        element: (
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.replace('/')}
            >
                <ProtectedRoute>
                    <AppLayout />
                </ProtectedRoute>
            </ErrorBoundary>
        ),
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
                path: '/bookings/:bookingId',
                element: <Booking />,
            },
            {
                path: '/checkin/:bookingId',
                element: <Checkin />,
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
        <DarkModeProvider>
            <QueryClientProvider client={queryClient}>
                <GlobalStyles />
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{ margin: '8px' }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                        style: {
                            fontSize: '16px',
                            maxWidth: '500px',
                            padding: '16px 24px',
                            backgroundColor: 'bg-green-500',
                            color: 'bg-grey-700)',
                        },
                        iconTheme: {
                            primary: '#000',
                            secondary: '#fff',
                        },
                    }}
                />
            </QueryClientProvider>
        </DarkModeProvider>
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
