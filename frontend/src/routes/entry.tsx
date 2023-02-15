import type { FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import MainForm from '../components/main-form'
import ChildrenForm from '../components/children-form'
import type { operations } from '../../../generated/schema'
import { createUser } from '../lib/fetcher'
import suggestAddress from '../lib/api/suggest-address'
import { TEXTURE_IMAGE } from '../config'

type FormInputs = operations['postUser']['requestBody']['content']['application/json']
type AddressResponse = {
  results:
    | {
        address1: string
        address2: string
        address3: string
      }[]
    | null
}

const Entry: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    trigger,
    formState: { errors },
    control,
  } = useForm<FormInputs>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'children',
  })

  const addChildren = () => {
    append({
      familyNameKanji: '',
      givenNameKanji: '',
      familyNameKana: '',
      givenNameKana: '',
      allergy: '',
    })
  }

  const removeChildren = (index: number) => {
    remove(index)
  }

  const suggestAddressFromZipCode = async () => {
    setIsLoading(true)
    try {
      const isCorrectFormat = await trigger('zipCode', { shouldFocus: true })
      if (isCorrectFormat) {
        const zipCode = getValues('zipCode')
        const res = (await suggestAddress(zipCode)) as AddressResponse
        if (res.results) {
          const result = res.results[0]
          setValue('address1', result.address1 + result.address2 + result.address3)
        } else {
          throw new Error()
        }
      }
    } catch {
      setError(
        'zipCode',
        { type: 'custom', message: '住所が取得できませんでした' },
        { shouldFocus: true },
      )
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setIsLoading(true)
    createUser(data)
      .then(() => {
        navigate('/')
      })
      .catch((e) => {
        if (e instanceof createUser.Error) {
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
    <div className='relative bg-gray-100 px-5 py-7'>
      <img
        className='pointer-events-none absolute top-0 left-0 z-0 h-full w-full'
        src={TEXTURE_IMAGE}
        alt='texture'
      />
      <div className='m-auto max-w-2xl rounded bg-white px-4 py-7 text-center text-zinc-600 shadow-2xl'>
        <div className='mt-14 mb-12'>
          <h1>----------------</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MainForm
            register={register}
            errors={errors}
            suggestAddressFromZipCode={suggestAddressFromZipCode}
          />
          {fields.map((field, index) => (
            <ChildrenForm
              key={field.id}
              register={register}
              errors={errors}
              childrenIndex={index}
              removeChildren={removeChildren}
              isLoading={isLoading}
            />
          ))}
          <button
            onClick={addChildren}
            type='button'
            disabled={isLoading}
            className='mx-auto mt-16 mb-12 block text-base'
          >
            <span className='block text-sm font-light text-gray-400'>children?</span>+
            お子様を追加する
          </button>
          <button
            type='submit'
            disabled={isLoading}
            className='mx-auto mb-10 block w-5/6 rounded-full bg-gradient-to-r from-emerald-300 to-emerald-500 py-6 text-2xl text-white shadow-2xl'
          >
            回答する
          </button>
          <Link className='mb-8 block' to='/'>
            &lt; 戻る
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Entry
