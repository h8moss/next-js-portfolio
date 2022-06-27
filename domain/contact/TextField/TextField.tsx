import { ErrorMessage, Field } from "formik";

interface Props {
  name: string;
  placeholder: string;
  isTextarea?: boolean;
}

const TextField = ({ name, placeholder, isTextarea = false }: Props) => {
  return (
    <>
      <Field
        name={name}
        className="p-6 my-3 mx-auto max-w-md w-full rounded-xl text-black"
        placeholder={placeholder}
        {...(isTextarea ? { as: "textarea", rows: 5 } : {})}
      />
      <div className="text-xs text-red-500 text-center">
        <ErrorMessage name={name} />
      </div>
    </>
  );
};

export default TextField;
