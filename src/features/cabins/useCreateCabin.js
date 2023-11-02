import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useCreateCabin() {
    const queryClient = useQueryClient()
    const { mutate: createCabine, isLoading: isCreating } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success('Cabin successfully created')
            queryClient.invalidateQueries({
                // gdy funkcja dodawania się powiedzie nakazujemy wywołać invalidate dla queryKey: 'cabins i się odświeża
                queryKey: ['cabins'],
            })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isCreating, createCabine }
}
