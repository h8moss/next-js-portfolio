import useTailwindSize from "../../hooks/useTailwindSize";
import Desktop from "./Desktop";
import Mobile from "./mobile";

interface Props {
  onClick: (v: string) => any;
}

const NavBar = ({ onClick = () => {} }: Props) => {
  const { isLg } = useTailwindSize();

  return (
    <>{isLg ? <Desktop onClick={onClick} /> : <Mobile onClick={onClick} />}</>
  );
};

export default NavBar;
