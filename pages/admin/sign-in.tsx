import { Form, Formik } from "formik";
import { useContext, useEffect } from "react";

import Button from "../../components/Button";
import AuthContext from "../../context/auth";
import TextField from "../../domain/contact/TextField/TextField";
import Toast from "../../components/Toast";
import useToastText from "../../hooks/useToastText";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/router";
import { SignInState } from "../../types";

interface FormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const handler = () => {
      if (auth.signInState === SignInState.signedIn) {
        router.push("/admin");
      }
    };
    auth.addUserListener(handler, "sign-in-page");
    return () => auth.removeUserListener(handler, "sign-in-page");
  }, [auth, router]);

  const onSubmit = async (values: FormValues) => {
    console.log("SUBMITTING");
    try {
      await auth.signInWithMail(values.email, values.password);
      router.push("/admin");
    } catch (e) {
      console.error(e);
      setErrorText("Something went wrong");
    }
  };

  const [props, setErrorText] = useToastText({
    props: {
      className: "bg-red-500",
    },
  });

  return (
    <>
      <NavBar onClick={(v) => router.push(v)} />
      <Toast {...props} />
      <div className="flex flex-col h-screen text-center p-4">
        <h1 className="m-4 mt-40">Sign in</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={onSubmit}
        >
          {({ submitForm }) => (
            <Form>
              <TextField name="email" placeholder="email@example.com" />
              <TextField name="password" placeholder="password" asPassword />
              <Button onClick={submitForm}>Submit</Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignIn;
