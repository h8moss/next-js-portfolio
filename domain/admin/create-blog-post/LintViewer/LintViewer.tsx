import { LintError } from "remark-linter/dist";

import style from "./LintViewer.module.css";

interface Props {
  lints: LintError[];
}

const LintViewer = ({ lints }: Props) => {
  return (
    <ul className={style.lint}>
      {lints.map((lint) => (
        <li key={lint.name + lint.row + lint.column}>
          {`${lint.name}:${lint.reason} @${lint.row}:${lint.column}`}
        </li>
      ))}
    </ul>
  );
};

export default LintViewer;
