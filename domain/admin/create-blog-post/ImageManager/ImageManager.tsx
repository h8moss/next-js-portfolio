import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import Button from "../../../../components/Button";

interface Props {
  onImageClick: (img: { name: string; src: string }) => unknown;
  images: { name: string; src: string }[];
  onUpload: (f: File) => unknown;
  canUpload: boolean;
}

const ImageManager = ({ images, onImageClick, onUpload, canUpload }: Props) => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  return (
    <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden">
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) setCurrentFile(e.target.files[0]);
          }}
        />
      </div>
      {currentFile !== null && (
        <div className="flex flex-col flex-1">
          <div className="relative flex-1 w-full h-10">
            <button
              className="absolute top-2 left-2 z-10"
              onClick={() => setCurrentFile(null)}
            >
              X
            </button>
            <Image
              src={URL.createObjectURL(currentFile)}
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>

          <Button
            disabled={!canUpload}
            onClick={() => {
              onUpload(currentFile);
              setCurrentFile(null);
            }}
          >
            Upload
          </Button>
        </div>
      )}
      {images.map((v) => (
        <motion.div
          key={v.src}
          className="relative w-full flex-1 my-1 cursor-pointer"
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.025 }}
          onClick={() => onImageClick(v)}
        >
          <Image src={v.src} alt="" layout="fill" objectFit="contain" />
        </motion.div>
      ))}
    </div>
  );
};

export default ImageManager;
