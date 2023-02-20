import type { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import Index from './routes/index'
import Entry from './routes/entry'
import Thanks from './routes/thanks'
import Sample, { loader as sampleLoader } from './routes/sample'
import ErrorBoundary from './routes/error-boundary'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Index /> },
      { path: 'entry', element: <Entry /> },
      { path: 'thanks', element: <Thanks /> },
      { path: 'sample', element: <Sample />, loader: sampleLoader },
    ],
  },
])

const App: FC = () => <RouterProvider router={router} />

export default App
