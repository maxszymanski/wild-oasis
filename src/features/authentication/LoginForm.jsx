import { useEffect, useState } from 'react'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import SpinnerMini from '../../ui/SpinnerMini'
import FormRowVertical from '../../ui/FormRowVertical'
import useLogin from './useLogin'
import { useUser } from './useUser'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading } = useLogin()
    const navigate = useNavigate()
    const { isAuthenticated, isLoading: userLoading } = useUser()

    useEffect(() => {
        if (isAuthenticated && !userLoading)
            navigate('/profile', { replace: true })
    }, [isAuthenticated, isLoading, navigate])

    function handleSubmit(e) {
        e.preventDefault()
        if (!email || !password) return
        login(
            { email, password },
            {
                onSettled: () => {
                    setEmail(''), setPassword('')
                },
            }
        )
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    defaultValue="max@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    defaultValue="example"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button $size="large" disabled={isLoading}>
                    {!isLoading ? 'Login' : <SpinnerMini />}
                </Button>
            </FormRowVertical>
        </Form>
    )
}

export default LoginForm
