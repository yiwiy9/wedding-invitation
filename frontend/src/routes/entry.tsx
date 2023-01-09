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
import axios from 'axios'

type MainProps = {
  register: UseFormRegister<FieldValues>
  unregister: UseFormUnregister<FieldValues>
  errors: Partial<FieldErrorsImpl<{ [x: string]: string }>>
  handleSubmit: UseFormHandleSubmit<FieldValues>
  onSubmit: (data: object) => void
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
    unregister([childAllergy, childName])
  }

  return (
    <div className='mt-10'>
      <div className='text-center'>子供 {childNum}</div>
      <br />
      <span className='block text-sm'>
        名前<sup>*</sup>
      </span>
      {errors?.[childName]?.message ? (
        <span className='text-red-600'>{errors?.[childName]?.message}</span>
      ) : null}
      <input
        {...register(childName, {
          required: { value: true, message: '名前は入力必須項目です' },
        })}
        type='text'
        placeholder='山田花子'
        className='w-full border-b py-2 placeholder-gray-500 placeholder-opacity-50 focus:border-b-2 focus:border-indigo-500 focus:outline-none'
      />
      <br />
      <br />
      <span className='block text-sm'>アレルギー</span>
      <input
        {...register(childAllergy)}
        type='text'
        placeholder='そば'
        className='w-full border-b py-2 placeholder-gray-500 placeholder-opacity-50 focus:border-b-2 focus:border-indigo-500 focus:outline-none'
      />
      <br />
      <button
        type='button'
        onClick={deleteChild}
        className='ml-auto block w-1/4 rounded py-5 underline'
      >
        削除
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

  const [fullAdress, setFullAdress] = useState('')
  const [zipCode, setZipCode] = useState('')

  type Res = {
    data: { code: number; data: { fullAdress: string } }
  }

  const handleChangeAdress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullAdress(e.target.value)
  }

  const handleChangeZipCode = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value)
    const res: Res = await axios.get(`https://api.zipaddress.net/?zipcode=${e.target.value}`)
    if (res.data.code === 200) {
      setFullAdress(res.data.data.fullAdress)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto md:max-w-md'>
      <div className='text-center'>
        <input
          type='radio'
          value='true'
          {...register('isAttend', {
            required: { value: true, message: '出席・欠席を選んでください' },
          })}
        />
        <span className='pr-10 pl-3'>出席</span>
        <input type='radio' value='false' {...register('isAttend')} />
        <span className='pl-3'>欠席</span>
        {errors?.isAttend?.message ? (
          <span className='block text-center text-red-600'>{errors.isAttend.message}</span>
        ) : null}
        <br />
        <br />
      </div>
      <div className='pt-5'>
        <span className='block text-sm'>
          姓（漢字）<sup>*</sup>
        </span>
        {errors?.familyNameKanji?.message ? (
          <span className='text-red-600'>{errors.familyNameKanji.message}</span>
        ) : null}
        <input
          {...register('familyNameKanji', {
            required: { value: true, message: '姓（漢字）は入力必須項目です' },
          })}
          type='text'
          autoComplete='family-name'
          placeholder='山田'
          className='w-full border-b py-2 placeholder-gray-500 placeholder-opacity-50 focus:border-b-2 focus:border-indigo-500 focus:outline-none'
        />
        <br />
        <br />
        <span className='block text-sm'>
          姓（かな）<sup>*</sup>
        </span>
        {errors?.familyNameKana?.message ? (
          <span className='text-red-600'>{errors.familyNameKana.message}</span>
        ) : null}
        <input
          {...register('familyNameKana', {
            required: { value: true, message: '姓（かな）は入力必須項目です' },
          })}
          type='text'
          placeholder='やまだ'
          className='w-full border-b py-2 placeholder-gray-500 placeholder-opacity-50 focus:border-b-2 focus:border-indigo-500 focus:outline-none'
        />
        <br />
        <br />
        <span className='block text-sm'>
          名（漢字）<sup>*</sup>
        </span>
        {errors?.givenNameKanji?.message ? (
          <span className='text-red-600'>{errors.givenNameKanji.message}</span>
        ) : null}
        <input
          {...register('givenNameKanji', {
            required: { value: true, message: '名（漢字）は入力必須項目です' },
          })}
          type='text'
          autoComplete='given-name'
          placeholder='太郎'
          className='w-full border-b py-2 placeholder-gray-500 placeholder-opacity-50 focus:border-b-2 focus:border-indigo-500 focus:outline-none'
        />
        <br />
        <br />
        <span className='block text-sm'>
          名（かな）<sup>*</sup>
        </span>
        {errors?.givenNameKana?.message ? (
          <span className='text-red-600'>{errors.givenNameKana.message}</span>
        ) : null}
        <input
          {...register('givenNameKana', {
            required: { value: true, message: '名（かな）は入力必須項目です' },
          })}
          type='text'
          placeholder='たろう'
          className='w-full border-b py-2 placeholder-gray-500 placeholder-opacity-50 focus:border-b-2 focus:border-indigo-500 focus:outline-none'
        />
        <br />
        <br />
        <span className='block text-sm'>郵便番号</span>
        <input
          {...register('zipCode')}
          type='text'
          onChange={handleChangeZipCode}
          value={zipCode}
          autoComplete='postal-code'
          placeholder='1234567'
          className='w-full border-b py-2 placeholder-gray-500 placeholder-opacity-50 focus:border-b-2 focus:border-indigo-500 focus:outline-none'
        />
        <br />
        <br />
        <span className='block text-sm'>住所</span>
        <input
          {...register('adress1')}
          onChange={handleChangeAdress}
          value={fullAdress}
          type='text'
          autoComplete='address-line1'
          placeholder='東京都ｘｘ区ｘｘｘ 1-1-1'
          className='w-full border-b py-2 placeholder-gray-500 placeholder-opacity-50 focus:border-b-2 focus:border-indigo-500 focus:outline-none'
        />
        <br />
        <br />
        <span className='block text-sm'>建物名・部屋番号等</span>
        <input
          {...register('adress2')}
          type='text'
          autoComplete='address-line2'
          placeholder='ｘｘマンション 101号室'
          className='w-full border-b py-2 placeholder-gray-500 placeholder-opacity-50 focus:border-b-2 focus:border-indigo-500 focus:outline-none'
        />
        <br />
        <br />
        <span className='block text-sm'>電話番号</span>
        <input
          {...register('tel')}
          type='tel'
          autoComplete='tel'
          placeholder='09012345678'
          className='w-full border-b py-2 placeholder-gray-500 placeholder-opacity-50 focus:border-b-2 focus:border-indigo-500 focus:outline-none'
        />
        <br />
        <br />
        <span className='block text-sm'>メールアドレス</span>
        <input
          {...register('email')}
          type='email'
          autoComplete='email'
          placeholder='yamada@example.com'
          className='w-full border-b py-2 placeholder-gray-500 placeholder-opacity-50 focus:border-b-2 focus:border-indigo-500 focus:outline-none'
        />
        <br />
        <br />
        <span className='block text-sm'>アレルギー</span>
        <input
          {...register('allergy')}
          type='text'
          placeholder='卵'
          className='w-full border-b py-2 placeholder-gray-500 placeholder-opacity-50 focus:border-b-2 focus:border-indigo-500 focus:outline-none'
        />
        <br />
        <br />
        <span className='block text-sm'>メッセージ</span>
        <textarea
          {...register('message')}
          placeholder='おめでとう！'
          className='w-full border-b py-2 placeholder-gray-500 placeholder-opacity-50 focus:border-b-2 focus:border-indigo-500 focus:outline-none'
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
          className='m-auto block rounded px-4 py-2 underline'
        >
          + 子供を追加する
        </button>
        <br />
        <button
          type='submit'
          className='m-auto my-5 block rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-600'
        >
          送信
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
    formState: { errors },
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
      <div className='absolute top-20 left-1/2 w-3/5 -translate-x-1/2 pb-20'>
        <h1 className='pb-10 text-center font-serif text-6xl'>招待状</h1>
        <MainForm
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
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
