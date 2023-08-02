import { ChangeEvent, ReactNode, useRef } from 'react'

import clsx from 'clsx'

import s from './file-input.module.scss'

type FileInputPropsType = {
  onChange: (filelist: FileList) => void
  disabled?: boolean
  trigger: ReactNode
}

export const FileInput = (props: FileInputPropsType) => {
  const { onChange, disabled = false, trigger } = props
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleUploadClick = () => inputRef.current?.click()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      onChange(e.target.files)
    }
  }

  const classNames = {
    container: s.container,
    trigger: clsx(s.trigger, disabled && s.disabled),
    input: s.input,
  }

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
  )
}
