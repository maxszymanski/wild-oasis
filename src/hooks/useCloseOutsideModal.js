import { useEffect, useRef } from 'react'

export function useCloseOutsideModal(setOpenName) {
    const ref = useRef()
    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpenName('')
            }
        }

        document.addEventListener('click', handleClick, true) // dodajemy na koncu true i wtedy addEven nie działa do gory tylko w dól i nasłuchuje tylko jesli modal jest otwarty
        return () => document.removeEventListener('click', handleClick)
    }, [setOpenName])
    return { ref }
}
