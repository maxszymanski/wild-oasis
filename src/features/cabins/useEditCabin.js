import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useEditCabin() {
    const queryClient = useQueryClient()
    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => createCabin(newCabinData, id),
        onSuccess: () => {
            toast.success('Cabin successfully edited')
            queryClient.invalidateQueries({
                // gdy funkcja dodawania się powiedzie nakazujemy wywołać invalidate dla queryKey: 'cabins i się odświeża
                queryKey: ['cabins'],
            })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isEditing, editCabin }
}
