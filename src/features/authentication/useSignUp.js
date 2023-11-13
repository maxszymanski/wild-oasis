import { useMutation } from '@tanstack/react-query'
import { signUp as signUpApi } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export function useSignUp() {
    const navigate = useNavigate()
    const { mutate: signUp, isLoading } = useMutation({
        mutationFn: ({ email, password, fullName }) =>
            signUpApi({ email, password, fullName }),
        onSuccess: (user) => {
            console.log(user)
            navigate('/dashboard')
            toast.success(
                'New user was created successfully. Please verify your addres email'
            )
        },
        onError: () =>
            toast.error('There was a problem with adding a new user'),
    })
    return { signUp, isLoading }
}
