const imageExtensions = ["jpg", "png", "jpeg", "gif", "svg", "webp"];

const isFilenameImage = (filename: string) => {
  return imageExtensions.includes(filename.split(".").at(-1));
};

export default isFilenameImage;
