import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'

export function useCabins() {
    //useQuery pobieramy dane, queryFn to funkcja przez którą pobieramy a key to dokladna tabela którą chcemy pobrać.
    const {
        isLoading,
        data: cabins,
        error,
    } = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins,
    })
    return { isLoading, cabins, error }
}
