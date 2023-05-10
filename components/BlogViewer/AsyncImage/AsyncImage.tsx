import { ComponentProps, useEffect, useMemo, useState } from "react";

interface Props extends Omit<ComponentProps<"img">, "src"> {
  src: Promise<string>;

  alt: string;
}

const AsyncImage = ({ src, alt, ...props }: Props) => {
  const [trueSrc, setTrueSrc] = useState<null | string>(null);
  const isLoading = useMemo(() => trueSrc === null, [trueSrc]);

  useEffect(() => {
    src.then((val) => {
      setTrueSrc(val);
    });
  }, [src]);

  return (
    <>
      {isLoading ? (
        <p>Loading image</p>
      ) : (
        <img src={trueSrc} alt={alt} {...props} />
      )}
    </>
  );
};

export default AsyncImage;
