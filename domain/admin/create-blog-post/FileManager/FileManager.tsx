import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import Button from "../../../../components/Button";
import isFilenameImage from "../../../../services/isFilenameImage";
import { AiFillFile } from "react-icons/ai";
import { StorageFile } from "../types";

interface Props {
  onFileClick: (file: StorageFile) => unknown;
  files: StorageFile[];
  onUpload: (f: File) => unknown;
  canUpload: boolean;
  onDelete?: null | ((file: StorageFile) => unknown);
}

const FileManager = ({
  files,
  onFileClick,
  onDelete = null,
  onUpload,
  canUpload,
}: Props) => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <div>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) setCurrentFile(e.target.files[0]);
          }}
        />
      </div>
      {currentFile !== null && (
        <div className="flex flex-col flex-1">
          <div className="relative w-full h-36 ">
            <button
              className="absolute top-2 left-2 z-10 text-red-500"
              onClick={() => setCurrentFile(null)}
            >
              X
            </button>
            {currentFile &&
            currentFile.name &&
            isFilenameImage(currentFile.name) ? (
              <Image
                src={URL.createObjectURL(currentFile)}
                layout="fill"
                objectFit="contain"
                alt=""
              />
            ) : (
              <AiFillFile size={80} />
            )}
          </div>

          <div className="flex">
            <Button
              className="m-2"
              disabled={!canUpload}
              onClick={() => {
                onUpload(currentFile);
                setCurrentFile(null);
              }}
            >
              Upload
            </Button>
          </div>
        </div>
      )}
      {onDelete && (
        <Button
          className="m-2 bg-red-500"
          disabled={isDeleting}
          onClick={() => setIsDeleting(true)}
        >
          Delete
        </Button>
      )}
      {files.map((v) => (
        <motion.div
          key={v.url}
          className="relative w-full my-1 cursor-pointer min-h-[80px] border-2"
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.025 }}
          onClick={() => {
            if (isDeleting) {
              onDelete(v);
              setIsDeleting(false);
            } else {
              onFileClick(v);
            }
          }}
        >
          {isFilenameImage(v.name) ? (
            <Image src={v.url} alt="" layout="fill" objectFit="contain" />
          ) : (
            <div className="flex flex-col justify-center text-center">
              <AiFillFile size={80} className="mx-auto" />
              {v.name}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FileManager;
