import type { FC } from 'react'
import type { ActionFunctionArgs } from 'react-router-dom'
import { useLoaderData, useSubmit, Link, Form } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { components } from '../../../generated/schema'
import { createTest, findTests } from '../lib/fetcher'

type LoaderData = readonly components['schemas']['Test'][]

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData()) as components['schemas']['Test']
  const res = await createTest(data)
  return res
}

export const loader = async (): Promise<LoaderData> => {
  const { data: emails } = await findTests({})
  return emails
}

const Test: FC = () => {
  const emails = useLoaderData() as LoaderData
  const submit = useSubmit()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<components['schemas']['Test']>()

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
      <Form method='post' onSubmit={handleSubmit((data) => submit(data))}>
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
      </Form>
    </>
  )
}

export default Test
