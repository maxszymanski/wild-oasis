import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings'
import toast from 'react-hot-toast'

export function useDeleteBooking() {
    const queryClient = useQueryClient() // dostajemy informacje z queryClient

    // dostajemy z useMutation isLoading a mutate to funkcja do mutacji
    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: deleteBookingApi,
        onSuccess: () => {
            toast.success('Booking successfully deleted')
            queryClient.invalidateQueries({
                // gdy funkcja usuwania się powiedzie nakazujemy wywołać invalidate dla queryKey: 'bookings i się odświeża
                queryKey: ['bookings'],
            })
        },
        onError: (err) => toast.error(err.message),
    })
    return { deleteBooking }
}
