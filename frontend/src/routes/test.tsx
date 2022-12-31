import type { FC } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { components } from '../../../generated/schema'
import { findTests } from '../lib/fetcher'

type LoaderData = readonly components['schemas']['Test'][]

export const loader = async (): Promise<LoaderData> => {
  const { data: messages } = await findTests({})
  return messages
}

const Test: FC = () => {
  const messages = useLoaderData() as LoaderData
  return (
    <>
      <h2>Test</h2>
      <ul>
        <li>
          <Link to='/'>Top Page</Link>
        </li>
        <li>
          <Link to='/entry'>Entry Page</Link>
        </li>
      </ul>
      <h3>Message List</h3>
      {messages.length ? (
        <ul>
          {messages.map((message) => (
            <li key={message.message}>{message.message}</li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No messages</i>
        </p>
      )}
    </>
  )
}

export default Test
