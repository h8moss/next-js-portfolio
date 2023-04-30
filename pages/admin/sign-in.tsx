import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Button from "../../components/Button";
import NavBar from "../../components/NavBar";
import Toast from "../../components/Toast";
import TextField from "../../domain/contact/TextField/TextField";
import useToastText from "../../hooks/useToastText";
import useAuth from "../../services/firebase/hooks/useAuth";

interface FormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const auth = useAuth({});

  useEffect(() => {
    if (auth.isSignedIn) router.push("/admin");
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
