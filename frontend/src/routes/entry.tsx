import type { FC } from 'react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import wallImage from './white_wall_hash.webp'

type mainProps = {
  register: any
  unregister: any
  errors: any
  handleSubmit: any
  onSubmit: any
  isDirty: any
  childrenArray: any
  setChildrenArray: any
  addNum: any
  setAddNum: any
}

type childProps = {
  register: any
  unregister: any
  errors: any
  childNum: number
  setChildrenArray: any
  childrenArray: any
  setAddNum: any
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

const MainForm: FC<mainProps> = (props) => {
  const addChildren = () => {
    let num = props.addNum + 1
    let array = props.childrenArray
    array.push(num)
    props.setChildrenArray(array)
    props.setAddNum(num)
  }

  return (
    <form onSubmit={props.handleSubmit(props.onSubmit)} className='text-xl '>
      <div className='text-center'>
        <input
          value='attend'
          type='radio'
          {...props.register('attend', {
            required: { value: true, message: '出席・欠席を選んでください' },
          })}
        />
        <span className='pr-5 pl-3'>attend</span>
        <input value='absent' type='radio' {...props.register('attend')} />
        <span className='pl-3'>decline</span>
        {props.errors?.attend?.message ? (
          <span className='block text-center text-red-600'>{props.errors.attend.message}</span>
        ) : (
          <br />
        )}
      </div>
      <div className='pt-5'>
        <label className='inline-block w-60 text-right'>
          Name<sup>*</sup>
        </label>
        <input
          {...props.register('name', {
            required: { value: true, message: '名前は入力必須項目です' },
          })}
          className='ml-10 inline-block border-2 border-solid border-black'
        />
        <br />
        {props.errors?.name?.message ? (
          <span className='block text-center text-red-600'>{props.errors.name.message}</span>
        ) : (
          <br />
        )}
        <label className='inline-block w-60 text-right'>Adress</label>
        <input
          {...props.register('adress')}
          className='ml-10 inline-block border-2 border-solid border-black'
        />
        <br />
        <br />
        <label className='inline-block w-60 text-right'>Phone number</label>
        <input
          {...props.register('phoneNumber')}
          className='ml-10 inline-block border-2 border-solid border-black'
        />
        <br />
        <br />
        <label className='inline-block w-60 text-right'>
          Email<sup>*</sup>
        </label>
        <input
          className='ml-10 inline-block border-2 border-solid border-black'
          {...props.register('email', {
            required: { value: true, message: 'メールアドレスは入力必須項目です' },
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: '有効なメールアドレスを入力してください',
            },
          })}
        />
        <br />
        {props.errors?.email?.message ? (
          <span className='block text-center text-red-600'>{props.errors.email.message}</span>
        ) : (
          <br />
        )}
        <label className='inline-block w-60 text-right'>Allergy</label>
        <input
          {...props.register('allergy')}
          className='ml-10 inline-block border-2 border-solid border-black'
        />
        <br />
        <br />
        <label className='inline-block w-60 text-right'>Message</label>
        <textarea
          {...props.register('message')}
          className='ml-10 inline-block border-2 border-solid border-black align-top'
        />
        <br />
        <br />
        {props.childrenArray.length === 0
          ? null
          : props.childrenArray.map((value: number, index: number) => {
              return (
                <ChildForm
                  register={props.register}
                  unregister={props.unregister}
                  errors={props.errors}
                  childNum={value}
                  setChildrenArray={props.setChildrenArray}
                  childrenArray={props.childrenArray}
                  setAddNum={props.setAddNum}
                  key={index}
                />
              )
            })}
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
          disabled={!props.isDirty}
          className={
            props.isDirty
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

const ChildForm: FC<childProps> = (props) => {
  const deleteChild = () => {
    let array = props.childrenArray.filter((child: number) => {
      return child !== props.childNum
    })
    if (array.length === 0) {
      props.setAddNum(0)
    }
    props.setChildrenArray(array)
    props.unregister([`childAllergy${props.childNum}`, childName])
  }

  let childName = `childName${props.childNum}`

  return (
    <div>
      <div className='text-center'>children {props.childNum}</div>
      <br></br>
      <label className='inline-block w-60 text-right'>
        Name<sup>*</sup>
      </label>
      <input
        {...props.register(childName, {
          required: { value: true, message: '名前は入力必須項目です' },
        })}
        className='ml-10 inline-block border-2 border-solid border-black'
      />
      <br />
      {props.errors?.[childName]?.message ? (
        <span className='block text-center text-red-600'>{props.errors[childName].message}</span>
      ) : (
        <br />
      )}
      <label className='inline-block w-60 text-right'>Allergy</label>
      <input
        {...props.register(`childAllergy${props.childNum}`)}
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

const Modal: FC<{ modalHidden: () => void }> = (props) => {
  return (
    <div id='overley'>
      <div className='z-10 h-1/4 w-1/4 bg-white p-10 font-serif'>
        <p className='pb-10 text-center text-2xl'>Sent successfully!!</p>
        <button
          onClick={props.modalHidden}
          className='m-auto mt-5 block rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-500'
        >
          close
        </button>
      </div>
    </div>
  )
}

export default Entry
