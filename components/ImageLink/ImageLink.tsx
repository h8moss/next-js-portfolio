import Image from "next/image";

import style from "./style.module.css";

interface Props {
  href: string;
  alt: string;
  src: string;
}

const ImageLink = ({ href, alt, src }: Props) => {
  return (
    <a href={href} className={style.ImageLink} target="_blank" rel="noreferrer">
      <Image src={src} alt={alt} width={40} height={40} />
    </a>
  );
};

export default ImageLink;
