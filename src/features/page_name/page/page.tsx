// import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { FileInput } from '@/components/ui/file-input'
import {useLocation} from 'react-router-dom';
import {useGetUploadUrlQuery} from '@/features/page_name/service/page.api.ts';
import {useEffect} from 'react';


export const Page = () => {

  console.log('page render')

  const location = useLocation();
  let token = new URLSearchParams(location.hash).get('#access_token');
  useEffect(() => {
    const url = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=ea3a3312fc6d47beba22c334e4839b35';
    window.location.href = url;
  }, [token]);
  // const { data: diskData} = useGetDiskDataQuery({token: token!}, {skip: !token})
  const { data: uploadUrl, isSuccess  } = useGetUploadUrlQuery({token: token!}, {skip: !token})
  if (isSuccess) {
    console.log(uploadUrl.href)
  }


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
