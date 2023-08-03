import { Button } from "@/components/ui/button";
import s from "./upload.module.scss";
import { FileInput, FileType } from "@/components/ui/file-input";
import {
  useLazyGetUploadUrlQuery,
  useUploadFilesMutation,
} from "@/features/upload-page/service/page.api.ts";
import { useState } from "react";
import { FileList } from "@/features/upload-page/file-list";
import { useLocation } from "react-router-dom";

// const testToken = "y0_AgAAAAARkGX-AADLWwAAAADpPCsNbYO8uryPRKWaqydL8uilTx58NJg";

export const Upload = () => {
  const location = useLocation();
  let token = new URLSearchParams(location.hash).get("#access_token");

  console.log(token);
  const [areSelected, setAreSelected] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);
  const [uploadFiles] = useUploadFilesMutation();
  const [getUploadUrl] = useLazyGetUploadUrlQuery({});

  const uploadFileHandler = (files: FileType[]) => {
    setSelectedFiles(files);
    if (token !== ":token") {
      files.forEach((baseFile) => {
        getUploadUrl({ token: token, path: baseFile.file.name })
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
    }
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

  const redirectToOAuth = () => {
    window.location.href =
      "https://oauth.yandex.ru/authorize?response_type=token&client_id=d40b56d85e754d1fa89b5717f5858fb5";
  };

  const isAuth = token && token !== ":token";

  return (
    <>
      {!isAuth && (
        <Button variant={"secondary"} onClick={redirectToOAuth}>
          Login with Yandex
        </Button>
      )}
      {isAuth && (
        <div className={s.buttonBlock}>
          <FileInput
            setAreSelected={setAreSelected}
            onChange={uploadFileHandler}
            trigger={<Button disabled={false}>Upload Files</Button>}
          />
        </div>
      )}
      {areSelected && (
        <div>
          <FileList files={selectedFiles} />
        </div>
      )}
    </>
  );
};
