import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useDeleteCabin() {
    const queryClient = useQueryClient() // dostajemy informacje z queryClient

    // dostajemy z useMutation isLoading a mutate to funkcja do mutacji
    const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: deleteCabinApi,
        onSuccess: () => {
            toast.success('Cabin successfully deleted')
            queryClient.invalidateQueries({
                // gdy funkcja usuwania się powiedzie nakazujemy wywołać invalidate dla queryKey: 'cabins i się odświeża
                queryKey: ['cabins'],
            })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isDeleting, deleteCabin }
}
