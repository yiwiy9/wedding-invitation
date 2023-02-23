import type { FC } from 'react'
import type { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import type { operations } from '../../../generated/schema'

type FormInputs = operations['postUser']['requestBody']['content']['application/json']
type ChildrenFormProps = {
  register: UseFormRegister<FormInputs>
  errors: Partial<FieldErrorsImpl<FormInputs>>
  childrenIndex: number
  removeChildren: (index: number) => void
  isLoading: boolean
}

const ChildrenForm: FC<ChildrenFormProps> = ({
  register,
  errors,
  childrenIndex,
  removeChildren,
  isLoading,
}) => (
  <div>
    <p className='mt-9 text-xs font-light text-gray-400'>children</p>
    <p className='text-sm'>-お子様-</p>
    <p className='text-xs text-red-600'>{errors.children?.message}</p>
    <div className='mt-7'>
      <p className='text-xs font-light text-gray-400'>Name</p>
      <p className='mb-1.5 text-sm'>お名前</p>
      <div className='flex'>
        <div className='w-full'>
          <input
            type='text'
            placeholder='山田'
            className='w-full border-b p-1 text-center focus:border-blue-500 focus:bg-neutral-100 focus:outline-none'
            {...register(`children.${childrenIndex}.familyNameKanji`, {
              required: { value: true, message: '必須項目です' },
              maxLength: { value: 150, message: '150文字以下にしてください' },
            })}
          />
          <p className='text-xs text-red-600'>
            {errors.children?.[childrenIndex]?.familyNameKanji?.message}
          </p>
        </div>
        <div className='ml-1.5 w-full'>
          <input
            type='text'
            placeholder='太郎'
            className='w-full border-b p-1 text-center focus:border-blue-500 focus:bg-neutral-100 focus:outline-none'
            {...register(`children.${childrenIndex}.givenNameKanji`, {
              required: { value: true, message: '必須項目です' },
              maxLength: { value: 150, message: '150文字以下にしてください' },
            })}
          />
          <p className='text-xs text-red-600'>
            {errors.children?.[childrenIndex]?.givenNameKanji?.message}
          </p>
        </div>
      </div>
    </div>
    <div className='mt-10'>
      <p className='text-xs font-light text-gray-400'>Name (Kana)</p>
      <p className='mb-1.5 text-sm'>お名前（ふりがな）</p>
      <div className='flex'>
        <div className='w-full'>
          <input
            type='text'
            placeholder='やまだ'
            className='w-full border-b p-1 text-center focus:border-blue-500 focus:bg-neutral-100 focus:outline-none'
            {...register(`children.${childrenIndex}.familyNameKana`, {
              required: { value: true, message: '必須項目です' },
              maxLength: { value: 150, message: '150文字以下にしてください' },
            })}
          />
          <p className='text-xs text-red-600'>
            {errors.children?.[childrenIndex]?.familyNameKana?.message}
          </p>
        </div>
        <div className='ml-1.5 w-full'>
          <input
            type='text'
            placeholder='たろう'
            className='w-full border-b p-1 text-center focus:border-blue-500 focus:bg-neutral-100 focus:outline-none'
            {...register(`children.${childrenIndex}.givenNameKana`, {
              required: { value: true, message: '必須項目です' },
              maxLength: { value: 150, message: '150文字以下にしてください' },
            })}
          />
          <p className='text-xs text-red-600'>
            {errors.children?.[childrenIndex]?.givenNameKana?.message}
          </p>
        </div>
      </div>
    </div>
    <div className='mt-10'>
      <p className='text-xs font-light text-gray-400'>Allergy</p>
      <p className='mb-1.5 text-sm'>アレルギー（任意）</p>
      <input
        type='text'
        placeholder='卵'
        className='w-full border-b p-1 text-center focus:border-blue-500 focus:bg-neutral-100 focus:outline-none'
        {...register(`children.${childrenIndex}.allergy`, {
          maxLength: { value: 150, message: '150文字以下にしてください' },
        })}
      />
      <p className='text-xs text-red-600'>{errors.children?.[childrenIndex]?.allergy?.message}</p>
    </div>
    <button
      onClick={() => removeChildren(childrenIndex)}
      type='button'
      disabled={isLoading}
      className='mr-0 ml-auto mt-4 block border-b border-black text-sm'
    >
      × 削除する
    </button>
  </div>
)

export default ChildrenForm
