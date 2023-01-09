import type { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import Index from './routes/index'
import Entry from './routes/entry'
import Sample, { loader as sampleLoader, action as sampleAction } from './routes/sample'
import ErrorPage from './routes/error-boundary'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: 'entry', element: <Entry /> },
      { path: 'sample', element: <Sample />, loader: sampleLoader, action: sampleAction },
    ],
  },
])

const App: FC = () => <RouterProvider router={router} />

export default App
