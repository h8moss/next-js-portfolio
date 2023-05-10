import { ComponentProps } from "react";
import { AiFillFile } from "react-icons/ai";

import isFilenameImage from "../../../services/isFilenameImage";
import AsyncImage from "../AsyncImage";

interface Props extends ComponentProps<"button"> {
  filename: string;
  asyncUrl: Promise<string>;
}

const FileButton = ({ filename, asyncUrl, ...props }: Props) => {
  return (
    <button {...props}>
      {filename}
      {isFilenameImage(filename) ? (
        <AsyncImage src={asyncUrl} alt={`Download ${filename}`} />
      ) : (
        <AiFillFile size={50} />
      )}
    </button>
  );
};

export default FileButton;
