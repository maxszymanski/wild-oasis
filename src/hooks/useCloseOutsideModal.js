import { useEffect, useRef } from 'react'

export function useCloseOutsideModal(close, listenCapturing = true) {
    const ref = useRef()
    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                close()
            }
        }

        document.addEventListener('click', handleClick, listenCapturing) // dodajemy na koncu true i wtedy addEven nie działa do gory tylko w dól i nasłuchuje tylko jesli modal jest otwarty
        return () =>
            document.removeEventListener('click', handleClick, listenCapturing)
    }, [close, listenCapturing])
    return ref
}
