import type { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import Index from './routes/index'
import Entry from './routes/entry'
import Test, { loader as testLoader } from './routes/test'
import ErrorPage from './routes/error-boundary'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: 'entry', element: <Entry /> },
      { path: 'test', element: <Test />, loader: testLoader },
    ],
  },
])

const App: FC = () => <RouterProvider router={router} />

export default App
