import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateSetting as updateSettingApi } from '../../services/apiSettings'

export function useUpdateSetting() {
    const queryClient = useQueryClient()
    const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success('Settings successfully edited')
            queryClient.invalidateQueries({
                // gdy funkcja dodawania się powiedzie nakazujemy wywołać invalidate dla queryKey: 'cabins i się odświeża
                queryKey: ['settings'],
            })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isUpdating, updateSetting }
}
