import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { createCabin } from '../../services/apiCabins'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'
import { useCreateCabin } from './useCreateCabin'
import { useEditCabin } from './useEditCabin'

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    //reset resetuje cały formularz, getValues - funkcja za pomocą której odwołujemy sie do value z innego inputa gdy chcemy go np uzyć do validacji
    const { id: editId, ...editValue } = cabinToEdit
    const isEditSession = Boolean(editId) ///jeśli jest editId czyli edutujemy to jest true
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValue : {}, // jesli edytujemy przypisujemy do defaultValue wartości z danej kabiny
    })
    const { errors } = formState
    const { isCreating, createCabine } = useCreateCabin()
    const { isEditing, editCabin } = useEditCabin()

    function onSubmit(newCabin) {
        const image =
            typeof newCabin.image === 'string'
                ? newCabin.image
                : newCabin.image[0]
        if (isEditSession)
            editCabin(
                { newCabinData: { ...newCabin, image }, id: editId },
                {
                    onSuccess: () => {
                        reset()
                        onCloseModal?.()
                    },
                }
            )
        else
            createCabine(
                { ...newCabin, image: image },
                {
                    onSuccess: () => {
                        reset()
                        onCloseModal?.()
                    },
                    // możemy odwołać się do onSuccess równiez podczas wywyołuania funckcji
                }
            )
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            type={onCloseModal ? 'modal' : 'regular'}
        >
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register('name', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    {...register('maxCapacity', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1',
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    {...register('regularPrice', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Price should be at least 1',
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register('discount', {
                        required: 'This field is required',
                        validate: (value) =>
                            value <= +getValues().regularPrice ||
                            'Discount should be less than regular price', // ustawiamy message
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register('description', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register('image', {
                        required: isEditSession
                            ? false
                            : 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    disabled={isCreating || isEditing}
                    $variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()} // optionalchaning - jesłi nie ma funkcji onCloseModal to ona sie nie wywoła i nie będzie błędu jeśli będziemy chcieli użyć ponownie formularza
                >
                    Cancel
                </Button>
                <Button>{isEditSession ? 'Edit' : 'Add'} cabin</Button>
            </FormRow>
        </Form>
    )
}

export default CreateCabinForm
