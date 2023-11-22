import { logout } from '../../services/apiAuth'
import ButtonIcon from '../../ui/ButtonIcon'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import useLogout from './useLogout'
import SpinnerMini from '../../ui/SpinnerMini'
import ButtonHoverInfo from '../../ui/ButtonHoverInfo'

function Logout() {
    const { logout, isLogingOut } = useLogout()
    return (
        <>
            <ButtonIcon
                onClick={logout}
                disabled={isLogingOut}
                onMouseEnter={handleClick}
                onMouseLeave={() => setPosition(null)}
            >
                {!isLogingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
            </ButtonIcon>
            {position && (
                <ButtonHoverInfo position={{ x: position?.x, y: position?.y }}>
                    Log Out
                </ButtonHoverInfo>
            )}
        </>
    )
}

export default Logout
