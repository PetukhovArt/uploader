import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  GetUploadUrlArgs,
  GetUploadUrlRes,
  UploadArgsType,
} from "@/features/upload-page/service/page.api.types.ts";

const baseURL = "https://cloud-api.yandex.net/v1/disk/resources/upload";

export const pageApi = createApi({
  reducerPath: "pageApi",
  baseQuery: fetchBaseQuery(),

  endpoints: (build) => {
    return {
      getUploadUrl: build.query<GetUploadUrlRes, GetUploadUrlArgs>({
        query: (args) => {
          return {
            method: "GET",
            url: baseURL,
            params: {
              path: args.path,
              overwrite: true,
            },
            headers: {
              Authorization: `OAuth ${args.token}`,
            },
          };
        },
      }),

      uploadFiles: build.mutation<any, UploadArgsType>({
        query: (args) => {
          return {
            method: args.method,
            url: args.url,
            body: args.data,
          };
        },
      }),
    };
  },
});
export const { useLazyGetUploadUrlQuery, useUploadFilesMutation } = pageApi;
