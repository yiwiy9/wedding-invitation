import type { FC } from 'react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import wallImage from './white_wall_hash.webp'

const Entry: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const [show, setShow] = useState(false)
  const onSubmit = (data: object) => {
    console.log(data)
    setShow(true)
  }
  return (
    <div className='relative'>
      {/* 親 */}
      <img src={wallImage} alt='' className='w-full' /> {/* サイト全体に画像のラッピング */}
      {/* ここからフォーム */}
      <div className='absolute top-40 left-1/2 w-1/2 -translate-x-1/2'>
        <div className='font-serif'>
          <h1 className='pb-10 text-center text-8xl'>R.V.S.P</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='text-xl '>
            <div className='text-center'>
              <input
                value='attend'
                type='radio'
                {...register('attend', {
                  required: { value: true, message: '出席・欠席を選んでください' },
                })}
              />
              <span className='pr-5 pl-3'>will attend</span>
              <input value='absent' type='radio' {...register('attend')} />
              <span className='pl-3'>will not attend</span>
              {errors?.attend?.message ? (
                <span className='block text-center text-red-600'>
                  {String(errors.attend.message)}
                </span>
              ) : (
                <div>
                  <br />
                </div>
              )}
            </div>
            <div className='pt-5'>
              <label className='inline-block w-60 text-right'>
                Name<sup>*</sup>
              </label>
              <input
                {...register('name', {
                  required: { value: true, message: '名前は入力必須項目です' },
                })}
                className='ml-10 inline-block border-2 border-solid border-black'
              />
              <br />
              {errors?.name?.message ? (
                <span className='block text-center text-red-600'>
                  {String(errors.name.message)}
                </span>
              ) : (
                <br />
              )}
              <label className='inline-block w-60 text-right'>Adress</label>
              <input
                {...register('adress')}
                className='ml-10 inline-block border-2 border-solid border-black'
              />
              <br />
              <br />
              <label className='inline-block w-60 text-right'>Phone number</label>
              <input
                {...register('phoneNumber')}
                className='ml-10 inline-block border-2 border-solid border-black'
              />
              <br />
              <br />
              <label className='inline-block w-60 text-right'>
                Email<sup>*</sup>
              </label>
              <input
                className='ml-10 inline-block border-2 border-solid border-black'
                {...register('email', {
                  required: { value: true, message: 'メールアドレスは入力必須項目です' },
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: '有効なメールアドレスを入力してください',
                  },
                })}
              />
              <br />
              {errors?.email?.message ? (
                <span className='block text-center text-red-600'>
                  {String(errors.email.message)}
                </span>
              ) : (
                <br />
              )}

              <label className='inline-block w-60 text-right'>Allergy</label>
              <input
                {...register('allergy')}
                className='ml-10 inline-block border-2 border-solid border-black'
              />
              <br />
              <br />
              <label className='inline-block w-60 text-right'>Message</label>
              <textarea
                {...register('message')}
                className='ml-10 inline-block border-2 border-solid border-black align-top'
              />
              <br />
              <br />
              <button
                type='submit'
                disabled={!isDirty}
                className={
                  isDirty
                    ? 'm-auto block rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-500'
                    : 'm-auto block rounded bg-gray-300 px-4 py-2 text-white'
                }
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* ここまでフォーム */}
      {/* ここからモーダル */}
      {show ? (
        <Modal
          onClick={() => {
            setShow(false)
          }}
        />
      ) : null}
      {/* ここまでモーダル */}
    </div>
  )
}

const Modal: FC = (props) => {
  return (
    <div id='overley'>
      <div className='z-10 h-1/4 w-1/4 bg-white p-10 font-serif'>
        <p className='pb-10 text-center text-2xl'>Sent successfully!!</p>
        <button
          onClick={props.onClick}
          className='m-auto mt-5 block rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-500'
        >
          close
        </button>
      </div>
    </div>
  )
}

export default Entry
