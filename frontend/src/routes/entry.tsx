import type { FC } from 'react'
import React, { useState, Dispatch, SetStateAction } from 'react'
import {
  useForm,
  FieldErrorsImpl,
  UseFormRegister,
  UseFormUnregister,
  UseFormHandleSubmit,
  FieldValues,
} from 'react-hook-form'
import wallImage from './white_wall_hash.webp'

type MainProps = {
  register: UseFormRegister<FieldValues>
  unregister: UseFormUnregister<FieldValues>
  errors: Partial<FieldErrorsImpl<{ [x: string]: string }>>
  handleSubmit: UseFormHandleSubmit<FieldValues>
  onSubmit: (data: object) => void
  isDirty: boolean
  childrenArray: Array<number>
  setChildrenArray: Dispatch<SetStateAction<Array<number>>>
  addNum: number
  setAddNum: Dispatch<SetStateAction<number>>
}

type ChildProps = {
  register: UseFormRegister<FieldValues>
  unregister: UseFormUnregister<FieldValues>
  errors: Partial<FieldErrorsImpl<{ [x: string]: string }>>
  setChildrenArray: Dispatch<SetStateAction<Array<number>>>
  childrenArray: Array<number>
  setAddNum: Dispatch<SetStateAction<number>>
  childNum: number
}

const ChildForm: FC<ChildProps> = (props) => {
  const { register, unregister, errors, setChildrenArray, childrenArray, setAddNum, childNum } =
    props

  const childName = `childName${childNum}`
  const childAllergy = `childAllergy${childNum}`

  const deleteChild = () => {
    const array = childrenArray.filter((child: number) => child !== childNum)
    if (array.length === 0) {
      setAddNum(0)
    }
    setChildrenArray(array)
    unregister([`childAllergy${childNum}`, childName])
  }

  return (
    <div>
      <div className='text-center'>children {childNum}</div>
      <br />
      <span className='inline-block w-60 text-right'>
        Name<sup>*</sup>
      </span>
      <input
        {...register(childName, {
          required: { value: true, message: '名前は入力必須項目です' },
        })}
        className='ml-10 inline-block border-2 border-solid border-black'
      />
      <br />
      {errors?.[childName]?.message ? (
        <span className='block text-center text-red-600'>{errors?.[childName]?.message}</span>
      ) : (
        <br />
      )}
      <span className='inline-block w-60 text-right'>Allergy</span>
      <input
        {...register(childAllergy)}
        className='ml-10 inline-block border-2 border-solid border-black'
      />
      <br />
      <button
        type='button'
        onClick={deleteChild}
        className='ml-auto block w-1/2 rounded px-4 py-2 underline'
      >
        delete
      </button>
    </div>
  )
}

const MainForm: FC<MainProps> = (props) => {
  const {
    register,
    unregister,
    errors,
    handleSubmit,
    onSubmit,
    isDirty,
    childrenArray,
    setChildrenArray,
    addNum,
    setAddNum,
  } = props

  const addChildren = () => {
    const num = addNum + 1
    const array = childrenArray
    array.push(num)
    setChildrenArray(array)
    setAddNum(num)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='text-xl '>
      <div className='text-center'>
        <input
          value='attend'
          type='radio'
          {...register('attend', {
            required: { value: true, message: '出席・欠席を選んでください' },
          })}
        />
        <span className='pr-5 pl-3'>attend</span>
        <input value='absent' type='radio' {...register('attend')} />
        <span className='pl-3'>decline</span>
        {errors?.attend?.message ? (
          <span className='block text-center text-red-600'>{errors.attend.message}</span>
        ) : (
          <br />
        )}
      </div>
      <div className='pt-5'>
        <span className='inline-block w-60 text-right'>
          Name<sup>*</sup>
        </span>
        <input
          {...register('name', {
            required: { value: true, message: '名前は入力必須項目です' },
          })}
          className='ml-10 inline-block border-2 border-solid border-black'
        />
        <br />
        {errors?.name?.message ? (
          <span className='block text-center text-red-600'>{errors.name.message}</span>
        ) : (
          <br />
        )}
        <span className='inline-block w-60 text-right'>Adress</span>
        <input
          {...register('adress')}
          className='ml-10 inline-block border-2 border-solid border-black'
        />
        <br />
        <br />
        <span className='inline-block w-60 text-right'>Phone number</span>
        <input
          {...register('phoneNumber')}
          className='ml-10 inline-block border-2 border-solid border-black'
        />
        <br />
        <br />
        <span className='inline-block w-60 text-right'>
          Email<sup>*</sup>
        </span>
        <input
          className='ml-10 inline-block border-2 border-solid border-black'
          {...register('email', {
            required: { value: true, message: 'メールアドレスは入力必須項目です' },
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: '有効なメールアドレスを入力してください',
            },
          })}
        />
        <br />
        {errors?.email?.message ? (
          <span className='block text-center text-red-600'>{errors.email.message}</span>
        ) : (
          <br />
        )}
        <span className='inline-block w-60 text-right'>Allergy</span>
        <input
          {...register('allergy')}
          className='ml-10 inline-block border-2 border-solid border-black'
        />
        <br />
        <br />
        <span className='inline-block w-60 text-right'>Message</span>
        <textarea
          {...register('message')}
          className='ml-10 inline-block border-2 border-solid border-black align-top'
        />
        <br />
        <br />
        {childrenArray.length === 0
          ? null
          : childrenArray.map((value: number) => (
              <ChildForm
                register={register}
                unregister={unregister}
                errors={errors}
                childNum={value}
                setChildrenArray={setChildrenArray}
                childrenArray={childrenArray}
                setAddNum={setAddNum}
                key={value}
              />
            ))}
        <button
          type='button'
          onClick={addChildren}
          className='m-auto block rounded border-2 border-solid border-black px-4 py-2'
        >
          + Add children
        </button>
        <br />
        <button
          type='button'
          className='ml-auto block w-1/2 rounded px-4 py-2 underline'
          onClick={() => {
            window.location.reload()
          }}
        >
          reset all
        </button>
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
  )
}

const Modal: FC<{ modalHidden: () => void }> = (props) => {
  const { modalHidden } = props
  return (
    <div id='overley'>
      <div className='z-10 h-1/4 w-1/4 bg-white p-10 font-serif'>
        <p className='pb-10 text-center text-2xl'>Sent successfully!!</p>
        <button
          type='button'
          onClick={modalHidden}
          className='m-auto mt-5 block rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-500'
        >
          close
        </button>
      </div>
    </div>
  )
}

const Entry: FC = () => {
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm()
  const [show, setShow] = useState(false)
  const [childrenArray, setChildrenArray] = useState(new Array(0))
  const [addNum, setAddNum] = useState(0)
  const onSubmit = (data: object) => {
    console.log(data)
    setShow(true)
  }

  return (
    <div className='relative'>
      <img src={wallImage} alt='' className='w-full' />
      <div className='absolute top-40 left-1/2 w-1/2 -translate-x-1/2'>
        <div className='font-serif'>
          <h1 className='pb-10 text-center text-8xl'>R.V.S.P</h1>
          <MainForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isDirty={isDirty}
            childrenArray={childrenArray}
            setChildrenArray={setChildrenArray}
            addNum={addNum}
            setAddNum={setAddNum}
            unregister={unregister}
          />
        </div>
      </div>
      {show ? <Modal modalHidden={() => setShow(false)} /> : null}
    </div>
  )
}

export default Entry
