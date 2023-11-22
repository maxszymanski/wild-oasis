import { useQuery } from '@tanstack/react-query'
import { getStaysTodayActivity } from '../../services/apiBookings'

export function useTodayActivity() {
    const { isLoading, data: activites } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ['today-acivity'],
    })
    return { activites, isLoading }
}
