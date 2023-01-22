import { useRouter } from "next/router";
import { useEffect } from "react";

import Button from "../../components/Button";
import useAuth from "../../services/firebase/hooks/useAuth";

const Admin = () => {
  const router = useRouter();

  const auth = useAuth();

  useEffect(() => {
    if (auth.user === null) router.push("/");
  }, [auth.user, router]);

  return (
    <div className="h-screen flex flex-col  text-center w-[80%] mx-auto">
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
