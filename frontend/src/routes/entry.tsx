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
    setFocus,
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
        setFocus('address1')
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
    <div className='px-5 py-7'>
      <div className='rounded bg-white px-4 py-7 text-center text-zinc-600 shadow-2xl'>
        <div className='relative mx-auto mt-8 mb-6 h-40 w-40'>
          <TitleLogo />
        </div>
        <div className='mb-6 text-lg tracking-wide'>
          <h1>{`${GROOM} & ${BRIDE}`}</h1>
        </div>
        <img className='mx-auto mb-12 w-24' src={LINE_FLOWER_IMAGE} alt='line-flower' />
        <form onSubmit={handleSubmit(onSubmit)} className='font-sans'>
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
            className='mx-auto mt-14 mb-10 block text-sm'
          >
            <span className='block text-xs font-light text-gray-400'>children?</span>+
            お子様を追加する
          </button>
          <button
            type='submit'
            disabled={isLoading}
            className='mx-auto mb-10 block w-4/5 rounded-full border border-white bg-gradient-to-br from-neutral-400 to-stone-300 py-4 text-lg text-white shadow-lg'
          >
            送信する
          </button>
          <Link className='mb-8 block text-sm' to='/'>
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
