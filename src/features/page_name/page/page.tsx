// import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { FileInput } from '@/components/ui/file-input'
// import {
//   useLazyGetUploadUrlQuery,
//   useUploadFilesMutation,
// } from '@/features/page_name/service/page.api.ts'

export const Page = () => {
  // const [file, setFile] = useState<any>()
  // const [isFilePicked, setIsFilePicked] = useState(false)
  //
  // const [
  //   getUploadUrl,
  //   { data: url, isLoading: urlLoading, isError: urlError, isSuccess: urlSuccess },
  // ] = useLazyGetUploadUrlQuery({})
  //
  // const [uploadFile, { data, isLoading, isError, isSuccess }] = useUploadFilesMutation({})


  // file: File
  const uploadFileHandler = () => {
    // setIsFilePicked(true)
    // setFile(file)
    // getUploadUrl()
  }

  return (
    <>
      <FileInput
        onChange={uploadFileHandler}
        trigger={
          <Button variant={'secondary'} disabled={false}>
            Upload File
          </Button>
        }
      />
    </>
  )
}

//drag-n-drop
// const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//   event.preventDefault()
//   event.stopPropagation()
//   if (event.dataTransfer.files && event.dataTransfer.files.length) {
//     setImg(event.dataTransfer.files[0])
//   }
// }

// const fileReader = new FileReader()
//
// fileReader.onloadend = () => {
//   setImg(fileReader.result)
// }
