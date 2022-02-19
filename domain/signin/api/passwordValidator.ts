const isLongEnough = (pw: string) => pw.length >= 9;
const hasLowerCase = (pw: string) => /[a-z]/.test(pw);
const hasUpperCase = (pw: string) => /[A-Z]/.test(pw);
const hasNumber = (pw: string) => /\d/.test(pw);
const hasRareCharacter = (pw: string) => /\W/.test(pw);

const testAll = (pw: string) => {
  let i = 0;

  if (hasLowerCase(pw)) i++;
  if (hasUpperCase(pw)) i++;
  if (hasNumber(pw)) i++;
  if (hasRareCharacter(pw)) i++;

  return i >= 2;
};

export { isLongEnough };
export { hasLowerCase };
export { hasUpperCase };
export { hasNumber };
export { hasRareCharacter };
export { testAll };
