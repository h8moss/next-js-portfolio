import {
  deleteObject,
  listAll,
  ref,
  StorageReference,
  uploadBytes,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { storage } from "..";

const useStorageFolder = (path: string) => {
  const [files, setFiles] = useState<StorageReference[]>([]);

  const uploadFile = async (file: File, name: string | null = null) => {
    if (!name) name = uuidV4();
    const extension = file.name.split(".").at(-1);
    const nameWExtension = name + "." + extension;

    const fileRef = ref(storage, `${path}/${nameWExtension}`);
    const finalRef = await uploadBytes(fileRef, file);
    setFiles((old) => [...old, finalRef.ref]);
  };

  const deleteFile = async (reference: StorageReference) => {
    setFiles((old) => {
      const i = old.findIndex((v) => v.name === reference.name);
      const result = [...old];
      result.splice(i, 1);
      return result;
    });

    await deleteObject(reference);
  };

  useEffect(() => {
    listAll(ref(storage, path)).then((result) => {
      setFiles(result.items);
    });
  }, [path]);

  return {
    uploadFile,
    deleteFile,
    files,
  };
};

export default useStorageFolder;
