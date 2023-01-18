import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import Button from "../../components/Button";
import AuthContext from "../../context/auth";

const Admin = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      if (auth.user === null) router.push("/");
    };

    auth.addUserListener(handler, "admin-page-handler");
    return () => auth.removeUserListener(handler, "admin-page-handler");
  }, [auth, router]);

  return (
    <div className="h-screen flex flex-col  text-center">
      <h1 className="p-8">Welcome Daniel</h1>

      <Button
        className="m-3"
        onClick={() => router.push("/admin/create-blog-post")}
      >
        Create blog post
      </Button>
      <Button className="m-3" onClick={() => auth.signOut()}>
        Sign out
      </Button>
    </div>
  );
};

export default Admin;
