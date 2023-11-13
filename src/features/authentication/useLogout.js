import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { logout as logoutApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'

function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: logout, isLoading: isLogingout } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries(), navigate('/login', { replace: true })
        },
        onError: (err) => {
            console.log('ERROR', err)
            toast.error('Problem with logout')
        },
    })
    return { logout, isLogingout }
}

export default useLogout
