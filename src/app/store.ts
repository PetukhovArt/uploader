import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { pageApi } from '@/features/page_name/service/page.api.ts'

export const store = configureStore({
  reducer: {
    [pageApi.reducerPath]: pageApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(pageApi.middleware),
})

setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
