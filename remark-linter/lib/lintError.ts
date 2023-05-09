type LintError = {
  row: number;
  column: number;
  name: string;
  reason: string;
};

export default LintError;
