import getTagColors from "../../../services/getTagColors";
import style from "./Tag.module.css";

interface Props {
  tag: string;
}

const Tag = ({ tag }: Props) => {
  const colors = getTagColors(tag);

  if (colors)
    return (
      <div
        className={style.tag}
        style={{
          color: colors.main,
          backgroundColor: colors.secondary,
        }}
      >
        {tag}
      </div>
    );

  return <div className={style.tag}>{tag}</div>;
};

export default Tag;
