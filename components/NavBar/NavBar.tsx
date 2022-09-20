import useTailwindSize from "../../hooks/useTailwindSize";
import Desktop from "./Desktop";
import Mobile from "./mobile";
import { NavbarProps } from "./types";

const NavBar = ({ onClick = () => {} }: NavbarProps) => {
  const { isLg } = useTailwindSize();

  return (
    <>{isLg ? <Desktop onClick={onClick} /> : <Mobile onClick={onClick} />}</>
  );
};

export default NavBar;
