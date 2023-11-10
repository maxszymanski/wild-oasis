import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'

export function useBookings() {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()

    //Filter//

    const filterValue = searchParams.get('status')

    const filter =
        !filterValue || filterValue === 'all'
            ? null
            : { field: 'status', value: filterValue }

    //Sort//

    const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
    const [field, direction] = sortByRaw.split('-')
    const sortBy = { field, direction }

    //sprawdzamy która strona jest wybrana PAGINATION przez url
    const pageSize = !searchParams.get('pageSize')
        ? 10
        : Number(searchParams.get('pageSize'))

    const page = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'))

    //useQuery pobieramy dane, queryFn to funkcja przez którą pobieramy a key to dokladna tabela którą chcemy pobrać.
    const {
        isLoading,
        data: { data: bookings, count } = {}, // jesli nie ma danych usawiamy pusty obiekt
        error,
    } = useQuery({
        queryKey: ['bookings', filter, sortBy, page, pageSize], // w tej tablicy możemy podać inne zależności, żeby w trakcie ich zmiany stan sie odświeżał
        queryFn: () => getBookings({ filter, sortBy, page, pageSize }),
    })

    // PRE-FETCHING // przy paginacji, pobieramy poprzednią i następną strone to store aby uniknąc wczytywania dachych i polepszyć userExperience
    const pageCount = Math.ceil(count / pageSize)
    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page + 1, pageSize], // w tej tablicy możemy podać inne zależności, żeby w trakcie ich zmiany stan sie odświeżał
            queryFn: () =>
                getBookings({ filter, sortBy, page: page + 1, pageSize }),
        })
    if (page < 1)
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page - 1, pageSize], // w tej tablicy możemy podać inne zależności, żeby w trakcie ich zmiany stan sie odświeżał
            queryFn: () =>
                getBookings({ filter, sortBy, page: page - 1, pageSize }),
        })

    return { isLoading, bookings, error, count, pageSize }
}
