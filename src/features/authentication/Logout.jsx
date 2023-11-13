import { logout } from '../../services/apiAuth'
import ButtonIcon from '../../ui/ButtonIcon'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import useLogout from './useLogout'
import SpinnerMini from '../../ui/SpinnerMini'

function Logout() {
    const { logout, isLogingOut } = useLogout()
    return (
        <ButtonIcon onClick={logout} disabled={isLogingOut}>
            {!isLogingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
        </ButtonIcon>
    )
}

export default Logout
