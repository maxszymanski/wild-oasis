import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'
import { useSettings } from './useSettings'
import { useUpdateSetting } from './useUpdateSettings'

function UpdateSettingsForm() {
    const { isLoading, settings = {} } = useSettings()
    const {
        minBookingLength,
        maxBookingLength,
        maxGuestsPerBooking,
        breakfastPrice,
    } = settings
    const { isUpdating, updateSetting } = useUpdateSetting()
    if (isLoading) return <Spinner />
    // funkcja do zmiany poszczególnych ustawień//
    //w tym przypadku id mamy ustawione takie jak nazwy kluczy w backend.///
    function handleUpdate(e) {
        const { value, id, defaultValue } = e.target
        if (!value || !id || defaultValue === value) return
        updateSetting({ [id]: value })
        e.target.defaultValue = value
    }

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="minBookingLength"
                    defaultValue={minBookingLength}
                    onBlur={(e) => handleUpdate(e)}
                />
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="maxBookingLength"
                    defaultValue={maxBookingLength}
                    onBlur={(e) => handleUpdate(e)}
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="maxGuestsPerBooking"
                    defaultValue={maxGuestsPerBooking}
                    onBlur={(e) => handleUpdate(e)}
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfastPrice"
                    defaultValue={breakfastPrice}
                    onBlur={(e) => handleUpdate(e)}
                />
            </FormRow>
        </Form>
    )
}

export default UpdateSettingsForm
