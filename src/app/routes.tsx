import { createHashRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom'

import { App } from '@/app/App.tsx'
import { Page } from '@/features/page_name/page'

export enum RouteNames {
  START_PAGE = '/',
  PAGE = '/page',
}

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path={RouteNames.START_PAGE} element={<App />}>
      <Route path={RouteNames.START_PAGE} element={<Navigate to={RouteNames.PAGE} />} />
      <Route path={RouteNames.PAGE} element={<Page />} />
    </Route>
  )
)
