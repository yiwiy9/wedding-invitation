import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

const Root: FC = () => (
  <div>
    <h1>共通レイアウト</h1>
    <Outlet />
  </div>
)

export default Root
