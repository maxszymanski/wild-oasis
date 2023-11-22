import { createPortal } from 'react-dom'
import styled from 'styled-components'

const StyledHoverInfo = styled.p`
    position: fixed;
    padding: 1rem 2rem;
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    font-size: 1.2rem;
    right: ${(props) => props.$position.x}px;
    top: ${(props) => props.$position.y}px;
`

function ButtonHoverInfo({ children, position }) {
    return createPortal(
        <StyledHoverInfo $position={position}>{children}</StyledHoverInfo>,
        document.body
    )
}

export default ButtonHoverInfo
