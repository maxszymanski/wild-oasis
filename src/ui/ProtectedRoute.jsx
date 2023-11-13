import { useNavigate } from 'react-router-dom'
import { useUser } from '../features/authentication/useUser'
import Spinner from './Spinner'
import styled from 'styled-components'
import { useEffect } from 'react'

export const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`

function ProtectedRoute({ children }) {
    const navigate = useNavigate()
    //1. Load the authenticated user
    const { user, isLoading, isAuthenticated, fetchStatus } = useUser()

    //2. if is No auyhenticated user , redirect yo the /login page
    useEffect(() => {
        if (!isAuthenticated && !isLoading && fetchStatus != 'fetching')
            navigate('/login')
    }, [isAuthenticated, isLoading, navigate, fetchStatus])

    //3. While loading , load spinner
    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        )
    //4. if there IS a user, render App
    if (isAuthenticated) return children
}

export default ProtectedRoute
