import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateUser as updateCurrentUser } from '../../services/apiAuth'

export function useUpdateUser() {
    const queryClient = useQueryClient()
    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            toast.success('User successfully updated')
            queryClient.invalidateQueries({
                // gdy funkcja dodawania się powiedzie nakazujemy wywołać invalidate dla queryKey: 'user i się odświeża
                queryKey: ['user'],
            })
            // queryClient.setQueryData(['user'], data.user)
        },
        onError: (err) => toast.error(err.message),
    })
    return { isUpdating, updateUser }
}
