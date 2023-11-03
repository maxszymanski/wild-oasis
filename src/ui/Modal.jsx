import {
    Children,
    cloneElement,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import styled from 'styled-components'
import { HiXMark } from 'react-icons/hi2'
import { createPortal } from 'react-dom'
import { useCloseOutsideModal } from '../hooks/useCloseOutsideModal'

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
`

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`

const ModalContext = createContext()

function Modal({ children }) {
    const [openName, setOpenName] = useState('')
    // w parent component trzymamy stany.

    // const close = () => setOpenName('')
    // const open = () => setOpenName
    // zwracamy children w useContextProvider żeby przysyłać dalej propsy do dzieci
    return (
        <ModalContext.Provider value={{ setOpenName, openName }}>
            {children}
        </ModalContext.Provider>
    )
}
function Open({ children, opens: opensWindowName }) {
    const { setOpenName } = useContext(ModalContext)
    /// cloneElement pozwala nam wywołać react emement i przekazać mu props bezpośrednio z rodzica. w tym przypadku zwracamy button i przekazujemy mu props onClick z propsem setOpenName(opens) z rodzica
    return cloneElement(children, {
        onClick: () => {
            setOpenName(opensWindowName)
        },
    })
}

function Window({ children, name }) {
    const { openName, setOpenName } = useContext(ModalContext)
    // const ref = useRef()

    // useEffect(() => {
    //     function handleClick(e) {
    //         if (ref.current && !ref.current.contains(e.target)) {
    //             setOpenName('')
    //         }
    //     }

    //     document.addEventListener('click', handleClick, true) // dodajemy na koncu true i wtedy addEven nie działa do gory tylko w dól i nasłuchuje tylko jesli modal jest otwarty
    //     return () => document.removeEventListener('click', handleClick)
    // }, [setOpenName])
    const { ref } = useCloseOutsideModal(setOpenName)

    if (name !== openName) return null
    return createPortal(
        // za pomocą createPortal możemy wywołać modal gdzie chcemy np. tak jak tutaj w body a nie w main, żyje poza main
        <Overlay>
            <StyledModal ref={ref}>
                <Button onClick={() => setOpenName('')}>
                    <HiXMark />
                </Button>
                <div>
                    {cloneElement(children, {
                        onCloseModal: () => setOpenName(''),
                    })}
                </div>
            </StyledModal>
        </Overlay>,
        document.body
    )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
