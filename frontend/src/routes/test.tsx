import type { FC } from 'react'
import type { ActionFunctionArgs } from 'react-router-dom'
import { useEffect } from 'react'
import { redirect, useLoaderData, useActionData, useSubmit, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { components } from '../../../generated/schema'
import { createTest, findTests } from '../lib/fetcher'

type FormInputs = components['requestBodies']['PostTest']['content']['application/json']
type LoaderData = components['responses']['Tests']['content']['application/json']
type ActionErrorData = components['responses']['TestValidationError']['content']['application/json']

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<ActionErrorData | Response> => {
  const data = Object.fromEntries(await request.formData()) as FormInputs
  try {
    await createTest(data)
  } catch (e) {
    if (e instanceof createTest.Error) {
      const error = e.getActualType()
      if (error.status === 422) {
        return error.data
      }
    }
  }
  return redirect('/')
}

export const loader = async (): Promise<LoaderData> => {
  const { data: emails } = await findTests({})
  return emails
}

const Test: FC = () => {
  const emails = useLoaderData() as LoaderData
  const actionErrors = useActionData() as ActionErrorData | undefined
  const submit = useSubmit()

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
      <h2>Test</h2>
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
          placeholder='メールアドレス'
          {...register('email', {
            required: '必須項目です。',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: '有効なメールアドレスを入力してください。',
            },
          })}
        />
        <button type='submit'>Create</button>
        {errors.email?.message && <p>{errors.email.message}</p>}
      </form>
    </>
  )
}

export default Test
