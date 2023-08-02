import { Outlet } from 'react-router-dom'

import s from './app.module.scss'

export function App() {
  return (
    <div className="App">
      <div className={s.container}>
        <div className={s.main}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
