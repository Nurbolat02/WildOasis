import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from '../../ui/Button';
import FileInput from "../../ui/FileInput";
import FormRow from '../../ui/FormRow';
import { Textarea } from "../../ui/Textarea";
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState, watch } = useForm()
  const image = watch("image");
  const { errors } = formState;
  const queryClient = useQueryClient()
  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin succefully created');
      queryClient.invalidateQueries({ queryKey: ['cabin'] });
      reset()

    },
    onError: (err) => toast.error(err.message)
  })

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] })
  }

  function onError(errors) {
    console.log(errors)
  }

  return <>
    <Form onSubmit={handleSubmit(onSubmit, onError)} >
      <FormRow label='Cabin name' error={errors?.name?.message} >
        <Input disabled={isCreating} type='text' id='name' {...register('name', {
          required: 'This field is requred'
        })} />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input disabled={isCreating} type='number' id='maxCapacity' {...register('maxCapacity', {
          required: 'This field is requred',
          min: {
            value: 1,
            message: 'Capacity should be at least 1'
          }
        })} />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input disabled={isCreating} type='number' id='regularPrice' {...register('regularPrice', {
          required: 'This field is requred',
          min: {
            value: 1,
            message: 'Capacity should be at least 1'
          }
        })} />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          disabled={isCreating}
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'This field is requred',
            validate: (value) => {
              const discount = Number(value);
              const regularPrice = Number(getValues().regularPrice);

              return discount <= regularPrice || 'Discount should be less than regular price';
            }
          })}
        />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea disabled={isCreating} type='number' id='description' {...register('description', {
          required: 'This field is requred'
        })} />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <>
          <FileInput
            id="image"
            accept="image/*"
            style={{ display: "none" }}
            disabled={isCreating}
            {...register("image", {
              required: "This field is required",
            })}
          />
          <div>
            <label
              htmlFor="image"
              style={{
                cursor: "pointer",
                borderRadius: "var(--border-radius-sm)",
                boxShadow: "var(--shadow-sm)",
                fontSize: "1.4rem",
                padding: "1.2rem 1.6rem",
                fontWeight: 500,
                color: "var(--color-brand-50)",
                backgroundColor: "var(--color-brand-600)",
                marginRight: "10px",
              }}
            >
              Choose file
            </label>
            {image?.length ? (<span>{image[0].name}</span>) : (<span>No file chosen</span>)}

          </div>

        </>
      </FormRow>

      <FormRow>
        <Button variation='secondary' type='reset' >Cancel</Button>
        <Button disabled={isCreating} >Add cabin</Button>
      </FormRow>
    </Form >
  </>



}

export default CreateCabinForm;
