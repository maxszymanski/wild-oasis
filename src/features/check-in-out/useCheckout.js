import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useCheckout() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {
        data,
        mutate: checkout,
        isLoading: isCheckingOut,
    } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: 'checked-out',
            }),
        onSuccess: (data) => {
            // data pochodzi z funkcji updateBooking i możemy z niej wyciągnąc co chcemy
            toast.success(`Booking #${data.id} successfully checked out`),
                queryClient.invalidateQueries({
                    // gdy funkcja dodawania się powiedzie nakazujemy wywołać invalidate dla queryKey: 'cabins i się odświeża
                    // queryKey: ['booking'],
                    active: true,
                    //  to działą podobnie to tego co queryKey ztylko invaliduje wszystkie aktywne rzeczy na stronie i nie musimy pamiętać queyKey
                })
            // navigate('/')
        },
        onError: () => toast.error('There was an error while checking out'),
    })
    return { checkout, isCheckingOut }
}
