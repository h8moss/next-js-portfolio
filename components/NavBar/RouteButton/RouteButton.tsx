import { useRouter } from "next/router";

import FlatButton from "../../FlatButton";

interface Props {
  route: string;
  onClick: (v: string) => void;
}

const RouteButton = ({
  children,
  route,
  onClick,
}: React.PropsWithChildren<Props>) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const isHighlighted = currentRoute == route;

  return (
    <FlatButton
      onClick={() => onClick(route)}
      className={isHighlighted && "accent-text"}
    >
      {children}
    </FlatButton>
  );
};

export default RouteButton;
