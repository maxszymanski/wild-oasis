import { useQuery } from '@tanstack/react-query'
import { getBooking } from '../../services/apiBookings'
import { useParams } from 'react-router-dom'

export function useBooking() {
    //pobieramy dane z URL z numerem Id
    const { bookingId } = useParams()

    const {
        isLoading,
        data: booking,
        error,
    } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId), // pobieramy dane tylko z potrzebnym id
        retry: false, // nie pozwalamy na ponowne próbowanie pobierania danych
    })
    return { isLoading, booking, error, bookingId }
}
