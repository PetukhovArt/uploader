import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { UploadRes } from '@/features/page_name/service/page.api.types.ts'

// const baseURL = 'https://cloud-api.yandex.net/v1/disk/'
const myToken = 'y0_AgAAAAARkGX-AADLWwAAAADpPCsNbYO8uryPRKWaqydL8uilTx58NJg'
const myService =
  'https://oauth.yandex.ru/authorize?response_type=token&client_id=ea3a3312fc6d47beba22c334e4839b35'

export const pageApi = createApi({
  reducerPath: 'pageApi',
  baseQuery: fetchBaseQuery({
    // prepareHeaders: headers => {
    // headers.set('Content-Type', 'multipart/form-data')
    // headers.set(
    //   'Authorization',
    //   'Oauth y0_AgAAAAARkGX-AATuwQAAAADpO20FORimoCU-QyumZywbrHasjDmJj0c'
    // )
    // headers.set('Authorization', 'OAuth <ВАШ_ТОКЕН>')
    // return headers
    // },
  }),

  endpoints: build => {
    return {
      getUploadUrl: build.query({
        query: arg => {
          return {
            method: 'GET',
            url: 'https://cloud-api.yandex.net/v1/disk',
            params: {
              path: arg.path, //<path for the file upload>
            },
            headers: {
              // 'Content-Type': 'multipart/form-data',
              Authorization: `Oauth ${myToken}}`,
            },
          }
        },
      }),
      uploadFiles: build.mutation<UploadRes, any>({
        query: (args: any) => {
          return {
            method: 'PUT',
            url: '',
            params: {
              path: args.path,
              // /{bucket}/{key}
              //<path for the file upload>
              // /<ПУТЬ_К_ФАЙЛУ_НА_ЯНДЕКС_ДИСКЕ>
              // %2Ffoo%2Fbar%2Fphoto.png
              overwrite: true,
              // fields: args.fields, //<properties to include in the response>
            },
            body: {
              email: args.email,
            },
          }
        },
      }),
    }
  },
})
export const { useLazyGetUploadUrlQuery, useUploadFilesMutation } = pageApi
