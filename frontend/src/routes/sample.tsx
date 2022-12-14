import type { FC } from 'react'
import type { ActionFunctionArgs } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  redirect,
  useLoaderData,
  useActionData,
  useSubmit,
  useNavigation,
  Link,
} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { components } from '../../../generated/schema'
import { createSample, findSamples } from '../lib/fetcher'

type FormInputs = components['requestBodies']['PostSample']['content']['application/json']
type LoaderData = components['responses']['Samples']['content']['application/json']
type ActionErrorData =
  components['responses']['SampleValidationError']['content']['application/json']

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<ActionErrorData | Response> => {
  const data = Object.fromEntries(await request.formData()) as FormInputs
  try {
    await createSample(data)
  } catch (e) {
    if (e instanceof createSample.Error) {
      const error = e.getActualType()
      if (error.status === 422) {
        return error.data
      }
    }
  }
  return redirect('/')
}

export const loader = async (): Promise<LoaderData> => {
  const { data: emails } = await findSamples({})
  return emails
}

const Sample: FC = () => {
  const emails = useLoaderData() as LoaderData
  const actionErrors = useActionData() as ActionErrorData | undefined
  const submit = useSubmit()
  const navigation = useNavigation()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(navigation.state !== 'idle')
  }, [navigation])

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>()

  useEffect(() => {
    if (actionErrors) {
      actionErrors.map(({ name, reason }) => setError(name, { type: 'custom', message: reason }))
    }
  }, [actionErrors, setError])

  return (
    <>
      <h2>Sample</h2>
      <ul>
        <li>
          <Link to='/'>Top Page</Link>
        </li>
        <li>
          <Link to='/entry'>Entry Page</Link>
        </li>
      </ul>
      <h3>Email List</h3>
      {emails.length ? (
        <ul>
          {emails.map((email) => (
            <li key={email.email}>{email.email}</li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No Emails</i>
        </p>
      )}
      <form onSubmit={handleSubmit((data) => submit(data, { method: 'post' }))}>
        <input
          type='email'
          placeholder='?????????????????????'
          {...register('email', {
            required: '?????????????????????',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: '????????????????????????????????????????????????????????????',
            },
          })}
        />
        <button type='submit' disabled={isLoading}>
          Create
        </button>
        {errors.email?.message && <p>{errors.email.message}</p>}
      </form>
    </>
  )
}

export default Sample
