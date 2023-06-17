import React, { useState } from 'react';
import classes from './MultipleFileInput.module.scss';

interface IMultipleFileInput {
  className?: string;
  title?: string;
  showFileName?: boolean;
  handleFilesChange: (files: FileList | null) => void;
  maxFileSize?: number;
  maxTotalSize?: number;
  maxFilesCount?: number;
}

const MultipleFileInput: React.FC<IMultipleFileInput> = ({
  className = '',
  title = 'Выбрать файлы',
  showFileName = true,
  handleFilesChange,
  maxFileSize = 1024000,
  maxTotalSize = 10240000,
  maxFilesCount = 10,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i; // фильтр на картинки

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || !files.length) {
      return;
    }

    const totalSize = Array.from(files).reduce((acc, curr) => acc + curr.size, 0);

    if (totalSize > maxTotalSize) {
      setError(`Превышен максимальный общий размер файлов. Максимальный размер: ${maxTotalSize / 1000}KB`);
      setSelectedFiles(null);
      handleFilesChange(null);
      return;
    }

    if (files.length > maxFilesCount) {
      setError(`Превышено максимальное количество файлов. Допустимо выбрать не более ${maxFilesCount} файлов.`);
      setSelectedFiles(null);
      handleFilesChange(null);
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.size > maxFileSize) {
        setError(`Превышен размер файла ${file.name}. Максимальный размер: ${maxFileSize / 1000}KB`);
        setSelectedFiles(null);
        handleFilesChange(null);
        return;
      }

      if (!allowedExtensions.exec(file.name)) {
        setError(`Неподдерживаемый формат файла ${file.name}. Допустимые форматы: .jpeg, .jpg, .png`);
        setSelectedFiles(null);
        handleFilesChange(null);
        return;
      }
    });

    setSelectedFiles(files);
    handleFilesChange(files);
    setError(null);
  };

  return (
    <div className={`${classes.multipleFileInput} ${className}`}>
      <label className={classes.multipleFileInput_input}>
        {title}
        <input type="file" multiple accept=".jpg,.jpeg,.png" onChange={handleInputChange} style={{ display: 'none' }} />
      </label>

      {selectedFiles && !showFileName && !error && (
        <div className={classes.multipleFileInput_fileSize}>Прикреплено файлов: {selectedFiles.length}</div>
      )}

      {selectedFiles && showFileName && !error && (
        <div className={classes.multipleFileInput_info}>
          <div className={classes.multipleFileInput_fileSize}>
            Общий размер выбранных файлов: {Math.round(Array.from(selectedFiles).reduce((acc, curr) => acc + curr.size, 0) / 1000)}KB
          </div>
          <ul className={classes.multipleFileInput_fileList}>
            {Array.from(selectedFiles).map((file, index) => (
              <li key={index} className={classes.multipleFileInput_fileName}>
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <div className={classes.multipleFileInput_error}>{error}</div>}
    </div>
  );
};

export default MultipleFileInput;