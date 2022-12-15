import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

function Form() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const nameValidate = (value: string) => {
    if (value.length === 0) {
      setError('名前は１文字以上です')
    } else {
      setError('')
    }
  }
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    const newName = event.target.value
    nameValidate(newName)
  }
  const handleSubmit = () => {
    console.log(name)
  }

  return (
    <div>
      <p>Name</p>
      <p />
      <input
        type='text'
        value={name}
        onChange={handleNameChange}
        className='border-2 border-solid border-black'
      />
      {error && <span className='text-red-600'>{error}</span>}
      <p />
      <button
        onClick={handleSubmit}
        type='submit'
        className='rounded bg-indigo-700 py-2 px-4 font-semibold text-white'
      >
        Submit
      </button>
    </div>
  )
}

function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data: object) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Name</p>
      <input
        {...register('name', { required: true })}
        className='border-2 border-solid border-black'
      />
      {errors.name && <span className='text-red-600'>必須項目です</span>}
      <p>Email</p>
      <input
        className='border-2 border-solid border-black'
        {...register('email', {
          required: true,
          minLength: 5,
        })}
      />
      {errors.email && <span className='text-red-600'>５文字以上の入力が必要です</span>}
      <p></p>
      <button type='submit' className='rounded bg-indigo-700 py-2 px-4 font-semibold text-white'>
        Submit
      </button>
    </form>
  )
}

function Practice() {
  return (
    <div>
      <h1 className='text-5xl'>welcome to our wedding</h1>
      <Form />
      <p></p>
      <HookForm />
    </div>
  )
}

export default Practice
