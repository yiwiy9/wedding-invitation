import React, { useState } from 'react'

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
      {error && <span className='text-red-600'>{error}</span>}
      <p />
      <input
        type='text'
        value={name}
        onChange={handleNameChange}
        className='border-2 border-solid border-black'
      />
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

function Practice() {
  return (
    <div>
      <h1 className='text-5xl'>welcome to our wedding</h1>
      <Form />
    </div>
  )
}

export default Practice
