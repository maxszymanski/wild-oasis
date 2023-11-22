import styled from 'styled-components'
import ButtonIcon from './ButtonIcon'
import { HiOutlineUser } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { logout } from '../services/apiAuth'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import useLogout from '../features/authentication/useLogout'
import SpinnerMini from './SpinnerMini'
import ButtonHoverInfo from './ButtonHoverInfo'
import DarkModeToggle from './DarkModeToggle'

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`

function HeaderMenu() {
    const { logout, isLogingOut } = useLogout()
    const [position, setPosition] = useState(null)
    const [hoverText, setHoverText] = useState('')
    const navigate = useNavigate()
    function handleClick(e) {
        const rect = e.target.closest('button').getBoundingClientRect()
        setPosition({
            x: window.innerWidth - rect.width - rect.x - 50,
            y: rect.y + rect.height + 8,
        })
        setHoverText(e.target.value)
    }

    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon
                    onClick={() => navigate('/account')}
                    onMouseEnter={handleClick}
                    onMouseLeave={() => setPosition(null)}
                    value="Update account"
                >
                    <HiOutlineUser />
                </ButtonIcon>
            </li>
            <li>
                <DarkModeToggle />
            </li>
            <li>
                <ButtonIcon
                    onClick={logout}
                    disabled={isLogingOut}
                    onMouseEnter={handleClick}
                    onMouseLeave={() => setPosition(null)}
                    value="Log out"
                >
                    {!isLogingOut ? (
                        <HiArrowRightOnRectangle />
                    ) : (
                        <SpinnerMini />
                    )}
                </ButtonIcon>
            </li>
            {position && (
                <ButtonHoverInfo position={{ x: position?.x, y: position?.y }}>
                    {hoverText}
                </ButtonHoverInfo>
            )}
        </StyledHeaderMenu>
    )
}

export default HeaderMenu
