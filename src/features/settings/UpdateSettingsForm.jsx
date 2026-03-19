import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import Input from "../../ui/Input";
import useSettings from './useSettings';
import useUpdateSetting from "./useEditSetting";

function UpdateSettingsForm() {
  const { isLoading, settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {} } = useSettings()

  const { isUpdating, updateSetting } = useUpdateSetting()

  if (isLoading) {
    return <Spinner />
  }
  function handleUpdate(e, field) {
    const { value } = e.target

    if (!value) {
      return
    }
    updateSetting({ [field]: value })
  }
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input defaultValue={minBookingLength} onBlur={(e) => handleUpdate(e, 'minBookingLength')} type='number' id='min-nights' />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input defaultValue={maxBookingLength} onBlur={(e) => handleUpdate(e, 'maxBookingLength')} type='number' id='max-nights' />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input defaultValue={maxGuestsPerBooking} tonBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')} ype='number' id='max-guests' />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input defaultValue={breakfastPrice} onBlur={(e) => handleUpdate(e, 'breakfastPrice')} type='number' id='breakfast-price' />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
