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

export const Upload = () => {
  const location = useLocation();

  let token = new URLSearchParams(location.hash).get("#access_token");
  if (token) {
    localStorage.setItem("token", token);
  }

  const checkToken = () => !!localStorage.getItem("token");
  const getToken = () => localStorage.getItem("token");

  const [areSelected, setAreSelected] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);
  const [uploadFiles] = useUploadFilesMutation();
  const [getUploadUrl] = useLazyGetUploadUrlQuery({});

  const uploadFileHandler = (files: FileType[]) => {
    setSelectedFiles(files);
    if (checkToken()) {
      files.forEach((baseFile) => {
        getUploadUrl({ token: getToken(), path: baseFile.file.name })
          .unwrap()
          .then((data) => {
            //uploadURL получен
            uploadFiles({
              url: data.href,
              method: data.method,
              data: baseFile.file,
            })
              .unwrap()
              .then(() => {
                //файл загружен
                handleStatusUpdateSuccess(baseFile.file.name);
              });
          })
          .catch((error) => {
            //ошибка при загрузке
            handleStatusUpdateError(baseFile.file.name, error.data.message);
          });
      });
    }
  };

  const handleStatusUpdateError = (fileName: string, error: string) => {
    setSelectedFiles((prevSelectedFiles) => {
      return prevSelectedFiles.map((file) => {
        if (file.file.name === fileName) {
          return {
            ...file,
            status: error,
            isUploading: false,
            isError: true,
          };
        }
        return file;
      });
    });
  };
  const handleStatusUpdateSuccess = (fileName: string) => {
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
      "https://oauth.yandex.ru/authorize?response_type=token&client_id=c6bbc93d6a394c0b93959d5ce59003c0";
  };

  return (
    <>
      {!checkToken() && (
        <Button variant={"secondary"} onClick={redirectToOAuth}>
          Login with Yandex
        </Button>
      )}
      {checkToken() && (
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
