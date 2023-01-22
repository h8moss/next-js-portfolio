import { ErrorMessage, Field } from "formik";

interface Props {
  name: string;
  placeholder: string;
  isTextarea?: boolean;
  asPassword?: boolean;
}

const TextField = ({
  name,
  placeholder,
  isTextarea = false,
  asPassword = false,
}: Props) => {
  return (
    <>
      <Field
        name={name}
        className="p-6 my-3 mx-auto max-w-md w-full rounded-xl text-black"
        {...{ placeholder }}
        {...(asPassword ? { type: "password" } : {})}
        {...(isTextarea ? { as: "textarea", rows: 5 } : {})}
      />
      <div className="text-xs text-red-500 text-center">
        <ErrorMessage name={name} />
      </div>
    </>
  );
};

export default TextField;
