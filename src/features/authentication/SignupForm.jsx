import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useSignUp } from './useSignUp'

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    //get values wyciągamy value z jednego inputa żeby przekazać go do validacji drugiego inputa//
    const { register, formState, handleSubmit, reset, getValues } = useForm()
    const { errors } = formState
    const { signUp, isLoading } = useSignUp()
    const onSubmit = (newUser) => {
        signUp(newUser, { onSettled: reset() })
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    {...register('fullName', {
                        required: 'This field is required',
                    })}
                    type="text"
                    id="fullName"
                    disabled={isLoading}
                />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    {...register('email', {
                        required: 'This field is required',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Please provide a valid email address',
                        },
                    })}
                    type="email"
                    id="email"
                    disabled={isLoading}
                />
            </FormRow>

            <FormRow
                label="Password (min 6 characters)"
                error={errors?.password?.message}
            >
                <Input
                    {...register('password', {
                        required: 'This field is required',
                        minLength: {
                            value: 6,
                            message:
                                'Password needs a minimium of 6 characters',
                        },
                    })}
                    type="password"
                    id="password"
                    disabled={isLoading}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    {...register('passwordConfirm', {
                        required: 'This field is required',
                        validate: (value) =>
                            value === getValues().password ||
                            'Password need to match',
                    })}
                    type="password"
                    id="passwordConfirm"
                    disabled={isLoading}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    $variation="secondary"
                    type="reset"
                    disabled={isLoading}
                    onClick={reset}
                >
                    Cancel
                </Button>
                <Button disabled={isLoading}>Create new user</Button>
            </FormRow>
        </Form>
    )
}

export default SignupForm
