import { Button } from "@/components/ui/button";
import s from "./upload.module.scss";
import { FileInput, FileType } from "@/components/ui/file-input";
import {
  useLazyGetUploadUrlQuery,
  useUploadFilesMutation,
} from "@/features/upload-page/service/page.api.ts";
import React, { useState } from "react";
import { FileList } from "@/features/upload-page/file-list";
import { redirectToOAuth } from "@/shared/utils/oauth-redirect.ts";

type UploadProps = {
  token: string | null;
};

export const Upload = ({ token }: UploadProps) => {
  const [areSelected, setAreSelected] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);

  const [uploadFiles] = useUploadFilesMutation();
  const [getUploadUrl] = useLazyGetUploadUrlQuery({});

  const uploadFileHandler = async (files: FileType[]) => {
    setSelectedFiles(files);
    for (const baseFile of files) {
      const { data, isError, error } = await getUploadUrl({
        token,
        path: baseFile.file.name,
      });
      const customError = error as {
        data: {
          message: string;
        };
      };

      if (data) {
        await uploadFiles({
          url: data.href,
          method: data.method,
          data: baseFile.file,
        });
      }

      handleStatusUpdate(
        baseFile.file.name,
        setSelectedFiles,
        isError ? customError.data.message : false
      );
    }
  };

  const handleStatusUpdate = (
    fileName: string,
    setSelectedFiles: React.Dispatch<React.SetStateAction<FileType[]>>,
    error?: any
  ) => {
    setSelectedFiles((prevFiles) => {
      return prevFiles.map((file) => {
        if (file.file.name === fileName) {
          return {
            ...file,
            isUploading: false,
            status: error ? error || "" : `Файл успешно загружен на диск`,
            isError: !!error,
          };
        }
        return file;
      });
    });
  };

  return (
    <>
      {!token && (
        <Button variant={"secondary"} onClick={redirectToOAuth}>
          Login with Yandex
        </Button>
      )}
      {token && (
        <div className={s.buttonBlock}>
          <FileInput
            setAreSelected={setAreSelected}
            onChange={uploadFileHandler}
            trigger={<Button>Upload Files</Button>}
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
