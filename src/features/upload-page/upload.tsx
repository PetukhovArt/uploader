import { Button } from "@/components/ui/button";
import s from "./upload.module.scss";
import { FileInput, FileType } from "@/components/ui/file-input";
import {
  useLazyGetUploadUrlQuery,
  useUploadFilesMutation,
} from "@/features/upload-page/service/page.api.ts";
import { useState } from "react";
import { FileList } from "@/features/upload-page/file-list";

const testToken = "y0_AgAAAAARkGX-AADLWwAAAADpPCsNbYO8uryPRKWaqydL8uilTx58NJg";

export const Upload = () => {
  //   const url = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=ea3a3312fc6d47beba22c334e4839b35';
  // const getOAuthTokenUrl='https://oauth.yandex.ru/authorize?response_type=token&client_id=ea3a3312fc6d47beba22c334e4839b35'

  // const location = useLocation();
  // let token = new URLSearchParams(location.hash).get('#access_token');
  // useEffect(() => {
  //   window.location.href = url;
  // }, [token]);
  const [areSelected, setAreSelected] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);
  const [uploadFiles] = useUploadFilesMutation();
  const [getUploadUrl] = useLazyGetUploadUrlQuery({});

  const uploadFileHandler = (files: FileType[]) => {
    setSelectedFiles(files);
    files.forEach((baseFile) => {
      getUploadUrl({ token: testToken, path: baseFile.file.name })
        .unwrap()
        .then((data) => {
          uploadFiles({
            url: data.href,
            method: data.method,
            data: baseFile.file,
          })
            .unwrap()
            .then(() => {
              handleStatusUpdate(baseFile.file.name);
            });
        })
        .catch((e) => {
          console.error(e);
        });
    });
  };

  const handleStatusUpdate = (fileName: string) => {
    setSelectedFiles((prevSelectedFiles) => {
      return prevSelectedFiles.map((file) => {
        if (file.file.name === fileName) {
          return {
            ...file,
            status: `Файл успешно загружен на диск`,
            isUploading: false,
          };
        }
        return file;
      });
    });
  };

  return (
    <>
      <div className={s.buttonBlock}>
        <FileInput
          setAreSelected={setAreSelected}
          onChange={uploadFileHandler}
          trigger={
            <Button variant={"secondary"} disabled={false}>
              Upload Files
            </Button>
          }
        />
      </div>
      {areSelected && (
        <div>
          <FileList files={selectedFiles} />
        </div>
      )}
    </>
  );
};