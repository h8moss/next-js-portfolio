// shamelessly stolen from: https://www.abstractapi.com/tools/email-regex-guide
const validateEmail = (inputText: string) => {
  var mailFormat =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return mailFormat.test(inputText);
};

export default validateEmail;
