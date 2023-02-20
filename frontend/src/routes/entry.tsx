import type { FC } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import type { operations } from '../../../generated/schema'
import { createUser } from '../lib/fetcher'
import suggestAddress from '../lib/api/suggest-address'
import MainForm from '../components/main-form'
import ChildrenForm from '../components/children-form'
import TitleLogo from '../components/title-logo'
import IconLoading from '../components/icon-loading'
import { GROOM, BRIDE, LINE_FLOWER_IMAGE } from '../config'

type FormInputs = operations['postUser']['requestBody']['content']['application/json']

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
    const isCorrectFormat = await trigger('zipCode', { shouldFocus: true })
    if (isCorrectFormat) {
      const zipCode = getValues('zipCode')
      try {
        const fullAddress = await suggestAddress(zipCode)
        setValue('address1', fullAddress)
      } catch {
        setError(
          'zipCode',
          { type: 'custom', message: '住所が取得できませんでした' },
          { shouldFocus: true },
        )
      }
    }
    setIsLoading(false)
  }

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setIsLoading(true)
    createUser(data)
      .then(() => {
        navigate('/thanks')
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
    <div className='bg-texture px-5 py-7'>
      <div className='rounded bg-white px-4 py-7 text-center text-zinc-600 shadow-2xl'>
        <div className='relative mx-auto mt-12 mb-8 h-56 w-56'>
          <TitleLogo />
        </div>
        <div className='mb-8 text-2xl tracking-wide'>
          <h1>{`${GROOM} & ${BRIDE}`}</h1>
        </div>
        <img className='mx-auto mb-16 w-32' src={LINE_FLOWER_IMAGE} alt='line-flower' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <MainForm
            register={register}
            errors={errors}
            suggestAddressFromZipCode={suggestAddressFromZipCode}
            isLoading={isLoading}
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
            className='mx-auto mb-10 block w-5/6 rounded-full bg-gradient-to-r from-emerald-300 to-emerald-500 py-5 text-2xl text-white shadow-2xl'
          >
            回答する
          </button>
          <Link className='mb-8 block' to='/'>
            &lt; 戻る
          </Link>
        </form>
      </div>
      {isLoading && (
        <div className='fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2'>
          <IconLoading classString='h-10 w-10' />
        </div>
      )}
    </div>
  )
}

export default Entry
