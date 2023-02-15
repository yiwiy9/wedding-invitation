import type { FC } from 'react'
import type { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import type { operations } from '../../../generated/schema'

type FormInputs = operations['postUser']['requestBody']['content']['application/json']
type MainFormProps = {
  register: UseFormRegister<FormInputs>
  errors: Partial<FieldErrorsImpl<FormInputs>>
  suggestAddressFromZipCode: () => Promise<void>
}

const MainForm: FC<MainFormProps> = ({ register, errors, suggestAddressFromZipCode }) => (
  <div className='text-xl'>
    <div>
      <p className='mb-2.5 text-lg'>いずれかをお選びください</p>
      <div className='flex items-end justify-center'>
        <input
          type='radio'
          value='true'
          className='mb-3 scale-150'
          {...register('isAttend', {
            required: { value: true, message: 'ご回答ください' },
          })}
        />
        <div className='ml-4'>
          <p className='text-right text-base font-light text-gray-400'>ACCEPTS</p>
          <p className='text-2xl'>ご出席</p>
        </div>
        <input
          type='radio'
          value='false'
          className='mb-3 ml-6 scale-150'
          {...register('isAttend')}
        />
        <div className='ml-4'>
          <p className='text-right text-base font-light text-gray-400'>DECLINES</p>
          <p className='text-2xl'>ご欠席</p>
        </div>
      </div>
      <p className='text-sm text-red-600'>{errors.isAttend?.message}</p>
    </div>
    <div className='mt-11'>
      <p className='text-base font-light text-gray-400'>Name</p>
      <p className='mb-2.5 text-lg'>お名前</p>
      <div className='flex'>
        <div className='w-full'>
          <input
            type='text'
            autoComplete='family-name'
            placeholder='姓'
            className='w-full border-b p-2 text-center focus:border-orange-500 focus:bg-neutral-100 focus:outline-none'
            {...register('familyNameKanji', {
              required: { value: true, message: '必須項目です' },
              maxLength: { value: 255, message: '255文字以下にしてください' },
            })}
          />
          <p className='text-sm text-red-600'>{errors.familyNameKanji?.message}</p>
        </div>
        <div className='ml-1.5 w-full'>
          <input
            type='text'
            autoComplete='given-name'
            placeholder='名'
            className='w-full border-b p-2 text-center focus:border-orange-500 focus:bg-neutral-100 focus:outline-none'
            {...register('givenNameKanji', {
              required: { value: true, message: '必須項目です' },
              maxLength: { value: 255, message: '255文字以下にしてください' },
            })}
          />
          <p className='text-sm text-red-600'>{errors.givenNameKanji?.message}</p>
        </div>
      </div>
    </div>
    <div className='mt-11'>
      <p className='text-base font-light text-gray-400'>Name (Kana)</p>
      <p className='mb-2.5 text-lg'>お名前（ふりがな）</p>
      <div className='flex'>
        <div className='w-full'>
          <input
            type='text'
            placeholder='やまだ'
            className='w-full border-b p-2 text-center focus:border-orange-500 focus:bg-neutral-100 focus:outline-none'
            {...register('familyNameKana', {
              required: { value: true, message: '必須項目です' },
              maxLength: { value: 255, message: '255文字以下にしてください' },
            })}
          />
          <p className='text-sm text-red-600'>{errors.familyNameKana?.message}</p>
        </div>
        <div className='ml-1.5 w-full'>
          <input
            type='text'
            placeholder='たろう'
            className='w-full border-b p-2 text-center focus:border-orange-500 focus:bg-neutral-100 focus:outline-none'
            {...register('givenNameKana', {
              required: { value: true, message: '必須項目です' },
              maxLength: { value: 255, message: '255文字以下にしてください' },
            })}
          />
          <p className='text-sm text-red-600'>{errors.givenNameKana?.message}</p>
        </div>
      </div>
    </div>
    <div className='mt-11'>
      <div className='flex justify-center'>
        <div className='ml-28'>
          <p className='text-base font-light text-gray-400'>Postcode</p>
          <p className='mb-2.5 text-lg'>郵便番号</p>
        </div>
        <button
          type='button'
          onClick={suggestAddressFromZipCode}
          className='mt-4 mb-3 ml-8 block rounded bg-orange-400 px-1 text-lg text-white'
        >
          住所検索
        </button>
      </div>
      <input
        type='text'
        autoComplete='postal-code'
        placeholder='1234567'
        className='w-full border-b p-2 text-center focus:border-orange-500 focus:bg-neutral-100 focus:outline-none'
        {...register('zipCode', {
          required: { value: true, message: '必須項目です' },
          pattern: {
            value: /^\d{7}$/,
            message: '有効な郵便番号(ハイフン不要)を入力してください',
          },
        })}
      />
      <p className='text-sm text-red-600'>{errors.zipCode?.message}</p>
    </div>
    <div className='mt-11'>
      <p className='text-base font-light text-gray-400'>Address</p>
      <p className='mb-2.5 text-lg'>ご住所</p>
      <input
        type='text'
        autoComplete='address-line1'
        placeholder='東京都ｘｘ区ｘｘｘ 1-1-1'
        className='w-full border-b p-2 text-center focus:border-orange-500 focus:bg-neutral-100 focus:outline-none'
        {...register('address1', {
          required: { value: true, message: '必須項目です' },
          maxLength: { value: 255, message: '255文字以下にしてください' },
        })}
      />
      <p className='text-sm text-red-600'>{errors.address1?.message}</p>
    </div>
    <div className='mt-11'>
      <p className='text-base font-light text-gray-400'>Building</p>
      <p className='mb-2.5 text-lg'>建物名・部屋番号等（任意）</p>
      <input
        type='text'
        autoComplete='address-line2'
        placeholder='ｘｘマンション 101号室'
        className='w-full border-b p-2 text-center focus:border-orange-500 focus:bg-neutral-100 focus:outline-none'
        {...register('address2', {
          maxLength: { value: 255, message: '255文字以下にしてください' },
        })}
      />
      <p className='text-sm text-red-600'>{errors.address2?.message}</p>
    </div>
    <div className='mt-11'>
      <p className='text-base font-light text-gray-400'>Phone number</p>
      <p className='mb-2.5 text-lg'>電話番号（任意）</p>
      <input
        type='tel'
        autoComplete='tel'
        placeholder='09012345678'
        className='w-full border-b p-2 text-center focus:border-orange-500 focus:bg-neutral-100 focus:outline-none'
        {...register('tel', {
          pattern: {
            value: /^0\d{9,10}$/,
            message: '有効な電話番号(ハイフン不要)を入力してください',
          },
        })}
      />
      <p className='text-sm text-red-600'>{errors.tel?.message}</p>
    </div>
    <div className='mt-11'>
      <p className='text-base font-light text-gray-400'>Email</p>
      <p className='mb-2.5 text-lg'>メールアドレス</p>
      <input
        type='email'
        autoComplete='email'
        placeholder='yamada@example.com'
        className='w-full border-b p-2 text-center focus:border-orange-500 focus:bg-neutral-100 focus:outline-none'
        {...register('email', {
          required: { value: true, message: '必須項目です' },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '有効なメールアドレスを入力してください',
          },
        })}
      />
      <p className='text-sm text-red-600'>{errors.email?.message}</p>
    </div>
    <div className='mt-11'>
      <p className='text-base font-light text-gray-400'>Allergy</p>
      <p className='mb-2.5 text-lg'>アレルギー（任意）</p>
      <input
        type='text'
        placeholder='卵'
        className='w-full border-b p-2 text-center focus:border-orange-500 focus:bg-neutral-100 focus:outline-none'
        {...register('allergy', {
          maxLength: { value: 255, message: '255文字以下にしてください' },
        })}
      />
      <p className='text-sm text-red-600'>{errors.allergy?.message}</p>
    </div>
    <div className='mt-11'>
      <p className='text-base font-light text-gray-400'>Message</p>
      <p className='mb-2.5 text-lg'>メッセージ（任意）</p>
      <textarea
        placeholder='ご自由にご入力ください'
        className='h-24 w-full border-b p-2 text-center focus:border-orange-500 focus:bg-neutral-100 focus:outline-none'
        {...register('message', {
          maxLength: { value: 255, message: '255文字以下にしてください' },
        })}
      />
      <p className='text-sm text-red-600'>{errors.message?.message}</p>
    </div>
  </div>
)

export default MainForm
