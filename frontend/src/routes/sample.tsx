import type { FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { useLoaderData, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import type { operations } from '../../../generated/schema'
import { createSample, findSamples } from '../lib/fetcher'

type FormInputs = operations['postSample']['requestBody']['content']['application/json']
type LoaderData = operations['getSamples']['responses'][200]['content']['application/json']

export const loader = async (): Promise<LoaderData> => {
  const { data: emails } = await findSamples({})
  return emails
}

const Sample: FC = () => {
  const emails = useLoaderData() as LoaderData
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setIsLoading(true)
    createSample(data)
      .then(() => {
        navigate('/')
      })
      .catch((e) => {
        if (e instanceof createSample.Error) {
          const error = e.getActualType()
          if (error.status === 422) {
            error.data.map(({ name, reason }) =>
              setError(name, { type: 'custom', message: reason }),
            )
          }
        }
      })
      .finally(() => setIsLoading(false))
  }

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
            <li key={email.sampleEmail}>{email.sampleEmail}</li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No Emails</i>
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='email'
          placeholder='メールアドレス'
          {...register('sampleEmail', {
            required: '必須項目です。',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: '有効なメールアドレスを入力してください。',
            },
          })}
        />
        <button type='submit' disabled={isLoading}>
          Create
        </button>
        {errors.sampleEmail?.message && <p>{errors.sampleEmail.message}</p>}
      </form>
    </>
  )
}

export default Sample
