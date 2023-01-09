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
      <div className='text-center'>子供 {childNum}</div>
      <br />
      <span className='inline-block w-60 text-right'>
        名前<sup>*</sup>
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
      <span className='inline-block w-60 text-right'>アレルギー</span>
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
          type='radio'
          value='true'
          {...register('isAttend', {
            required: { value: true, message: '出席・欠席を選んでください' },
          })}
        />
        <span className='pr-5 pl-3'>出席</span>
        <input type='radio' value='false' {...register('isAttend')} />
        <span className='pl-3'>欠席</span>
        {errors?.isAttend?.message ? (
          <span className='block text-center text-red-600'>{errors.isAttend.message}</span>
        ) : (
          <div>
            <br />
          </div>
        )}
      </div>
      <div className='pt-5'>
        <span className='inline-block w-60 text-right'>
          姓（漢字）<sup>*</sup>
        </span>
        <input
          {...register('familyNameKanji', {
            required: { value: true, message: '姓（漢字）は入力必須項目です' },
          })}
          type='text'
          autoComplete='family-name'
          placeholder='山田'
          className='ml-10 inline-block w-1/2 border-2 border-solid border-black p-1'
        />
        <br />
        {errors?.familyNameKanji?.message ? (
          <span className='block text-center text-red-600'>{errors.familyNameKanji.message}</span>
        ) : (
          <br />
        )}
        <span className='inline-block w-60 text-right'>
          姓（かな）<sup>*</sup>
        </span>
        <input
          {...register('familyNameKana', {
            required: { value: true, message: '姓（かな）は入力必須項目です' },
          })}
          type='text'
          placeholder='やまだ'
          className='ml-10 inline-block w-1/2 border-2 border-solid border-black p-1'
        />
        <br />
        {errors?.familyNameKana?.message ? (
          <span className='block text-center text-red-600'>{errors.familyNameKana.message}</span>
        ) : (
          <br />
        )}
        <span className='inline-block w-60 text-right'>
          名（漢字）<sup>*</sup>
        </span>
        <input
          {...register('givenNameKanji', {
            required: { value: true, message: '名（漢字）は入力必須項目です' },
          })}
          type='text'
          autoComplete='given-name'
          placeholder='太郎'
          className='ml-10 inline-block w-1/2 border-2 border-solid border-black p-1'
        />
        <br />
        {errors?.givenNameKanji?.message ? (
          <span className='block text-center text-red-600'>{errors.givenNameKanji.message}</span>
        ) : (
          <br />
        )}
        <span className='inline-block w-60 text-right'>
          名（かな）<sup>*</sup>
        </span>
        <input
          {...register('givenNameKana', {
            required: { value: true, message: '名（かな）は入力必須項目です' },
          })}
          type='text'
          placeholder='たろう'
          className='ml-10 inline-block w-1/2 border-2 border-solid border-black p-1'
        />
        <br />
        {errors?.givenNameKana?.message ? (
          <span className='block text-center text-red-600'>{errors.givenNameKana.message}</span>
        ) : (
          <br />
        )}
        <span className='inline-block w-60 text-right'>郵便番号</span>
        <input
          {...register('zipCode')}
          type='text'
          autoComplete='postal-code'
          placeholder='1234567'
          className='ml-10 inline-block w-1/2 border-2 border-solid border-black p-1'
        />
        <br />
        <br />
        <span className='inline-block w-60 text-right'>住所１</span>
        <input
          {...register('adress1')}
          type='text'
          autoComplete='address-line1'
          placeholder='東京都ｘｘ区ｘｘｘ 1-1-1'
          className='ml-10 inline-block w-1/2 border-2 border-solid border-black p-1'
        />
        <br />
        <br />
        <span className='inline-block w-60 text-right'>住所２</span>
        <input
          {...register('adress2')}
          type='text'
          autoComplete='address-line2'
          placeholder='ｘｘマンション 101号室'
          className='ml-10 inline-block w-1/2 border-2 border-solid border-black p-1'
        />
        <br />
        <br />
        <span className='inline-block w-60 text-right'>電話番号</span>
        <input
          {...register('tel')}
          type='tel'
          autoComplete='tel'
          placeholder='09012345678'
          className='ml-10 inline-block w-1/2 border-2 border-solid border-black p-1'
        />
        <br />
        <br />
        <span className='inline-block w-60 text-right'>メールアドレス</span>
        <input
          {...register('email')}
          type='email'
          autoComplete='email'
          placeholder='yamada@example.com'
          className='ml-10 inline-block w-1/2 border-2 border-solid border-black p-1'
        />
        <br />
        <br />
        <span className='inline-block w-60 text-right'>アレルギー</span>
        <input
          {...register('allergy')}
          type='text'
          placeholder='卵'
          className='ml-10 inline-block w-1/2 border-2 border-solid border-black p-1'
        />
        <br />
        <br />
        <span className='inline-block w-60 text-right'>メッセージ</span>
        <textarea
          {...register('message')}
          placeholder='おめでとう！'
          className='ml-10 inline-block w-1/2 border-2 border-solid border-black p-1 align-top'
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
      <div className='z-10 h-1/4 w-1/4 bg-white p-10'>
        <p className='pb-10 text-center text-2xl'>送信成功しました！</p>
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
      <div className='absolute top-20 left-1/2 w-3/5 -translate-x-1/2'>
        <h1 className='pb-10 text-center font-serif text-8xl'>R.V.S.P</h1>
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
      {show ? <Modal modalHidden={() => setShow(false)} /> : null}
    </div>
  )
}

export default Entry
