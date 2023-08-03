import { ChangeEvent, ReactNode, useRef } from "react";

import clsx from "clsx";

import s from "./file-input.module.scss";

type FileInputPropsType = {
  onChange: (files: FileType[]) => void;
  disabled?: boolean;
  trigger: ReactNode;
  setAreSelected: (value: boolean) => void;
};

export type FileType = {
  file: File;
  isUploading: boolean;
  status: string;
};

export const FileInput = (props: FileInputPropsType) => {
  const { onChange, disabled = false, trigger, setAreSelected } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => inputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAreSelected(true);
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files).map((file) => ({
        file,
        status: "Загрузка",
        isUploading: true,
      }));
      onChange(fileList);
    }
  };

  const classNames = {
    container: s.container,
    trigger: clsx(s.trigger, disabled && s.disabled),
    input: s.input,
  };

  return (
    <div className={classNames.container}>
      <span onClick={handleUploadClick} className={classNames.trigger}>
        {trigger}
      </span>
      <input
        type="file"
        multiple={true}
        ref={inputRef}
        onChange={handleFileChange}
        className={classNames.input}
      />
    </div>
  );
};
