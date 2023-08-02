
import { Button } from '@/components/ui/button'
import { FileInput } from '@/components/ui/file-input'
import {useGetUploadUrlQuery, useUploadFilesMutation} from '@/features/page_name/service/page.api.ts';
import {convertFileToBase64} from '@/features/page_name/imageToBase64.ts';


export const Page = () => {
  //   const url = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=ea3a3312fc6d47beba22c334e4839b35';

// const getOAuthTokenUrl='https://oauth.yandex.ru/authorize?response_type=token&client_id=ea3a3312fc6d47beba22c334e4839b35'
const testToken = 'y0_AgAAAAARkGX-AADLWwAAAADpPCsNbYO8uryPRKWaqydL8uilTx58NJg'
  // const location = useLocation();
  // let token = new URLSearchParams(location.hash).get('#access_token');
  // useEffect(() => {
  //   window.location.href = url;
  // }, [token]);

  const { data: getUploadUrl,isError  } = useGetUploadUrlQuery({token: testToken})
  const [uploadFiles] = useUploadFilesMutation()

  if (isError) {
    // window.location.href=getOAuthTokenUrl
  }
    // uploadFiles(getUploadUrl.href) // запускаем запрос на загрузку файлов



  // const [file, setFile] = useState<any>()
  // const [isFilePicked, setIsFilePicked] = useState(false)


  const uploadFileHandler = (files: any) => {
    console.log(files)
      const file = files[0];
      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          console.log(file64)
          if (getUploadUrl?.href) {
            uploadFiles({
              url: getUploadUrl.href,
              data: file64
            })
          }
        });
      } else {
        console.error("Error: ", "Файл слишком большого размера");
      }
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



