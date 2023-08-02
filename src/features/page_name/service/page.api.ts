import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {GetDiskDataRes, GetUploadUrlRes, } from '@/features/page_name/service/page.api.types.ts'



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
      getDiskData: build.query<GetDiskDataRes, { token:string }>({
        query: (args) => {
          return {
            method: 'GET',
            url: 'https://cloud-api.yandex.net/v1/disk',
            headers: {
              Authorization: `OAuth ${args.token}`,
            },
          }
        },
      }),

      getUploadUrl: build.query<GetUploadUrlRes, { token:string }>({
        query: (args) => {
          return {
            method: 'GET',
            url: 'https://cloud-api.yandex.net/v1/disk/resources/upload',
            params: {
              path: '/testfiles',
              overwrite: true
            },
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `OAuth ${args.token}`,
            },
          }
        },
      }),

      uploadFiles: build.mutation<any, any>({
        query: (args) => {
          return {
            method: 'POST',
            url: args.url,
            // params: {
            //   path: '/data',
            //   url: args.link,
            // },
            headers: {
              'Content-Type': 'multipart/form-data',
              // Authorization: `OAuth ${args.token}`,
            },
            body: {
              data: args.data,
            },
          }
        },
      }),
    }
  },
})
export const { useGetDiskDataQuery,useGetUploadUrlQuery, useUploadFilesMutation } = pageApi
