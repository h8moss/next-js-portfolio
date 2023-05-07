import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getBytes, getDownloadURL, ref } from "firebase/storage";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

import BlogBodyDiv from "../../../../components/BlogBodyDiv";
import BlogViewer from "../../../../components/BlogViewer";
import Button from "../../../../components/Button";
import Toast from "../../../../components/Toast";
import ImageManager from "../../../../domain/admin/create-blog-post/ImageManager";
import useToastText from "../../../../hooks/useToastText";
import { firestore, storage } from "../../../../services/firebase";
import useStorageFolder from "../../../../services/firebase/hooks/useStorageFolder";
import { BlogPost, BlogPostData, Locale } from "../../../../types";

interface Props {
  locale: Locale;
  isPrivate: boolean;
  id: string;
}

const AdminBlogPage = ({ id, isPrivate, locale }: Props) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [ogPost, setOgPost] = useState<BlogPostData | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [canUploadImage, setCanUploadImage] = useState(true);
  const [images, setImages] = useState<{ src: string; name: string }[]>([]);
  const router = useRouter();

  const [toastProps, setToastText] = useToastText({});

  const imageStorage = useStorageFolder(`blog-posts-${locale}/${id}`);

  const getImages = useCallback<
    () => Promise<{ src: string; name: string }[]>
  >(async () => {
    const downloadUrls = await Promise.all(
      imageStorage.files.map((file) => getDownloadURL(file))
    );

    return imageStorage.files.map((file, i) => ({
      src: downloadUrls[i],
      name: file.name,
    }));
  }, [imageStorage.files]);

  useEffect(() => {
    getImages().then((v) => setImages(v));
  }, [getImages]);

  const onUploadImage = async (file: File) => {
    if (canUploadImage) {
      setCanUploadImage(false);

      await imageStorage.uploadFile(file);

      setCanUploadImage(true);
    }
  };

  const postDoc = useMemo(
    () =>
      doc(
        firestore,
        `/blog-posts-${locale}${isPrivate ? "-private" : ""}/${id}`
      ),
    [id, isPrivate, locale]
  );

  const fetchPost = useCallback(async () => {
    const postSn = await getDoc(postDoc);

    if (postSn.exists()) {
      const data = postSn.data()!;
      const { body, title, tags } = data;

      const created = { seconds: (data.created as Timestamp).seconds };

      setPost({
        id: postSn.id,
        body,
        title,
        tags,
        created,
      });
      setOgPost({
        body,
        title,
        tags,
      });
    } else {
      setError("Post does not exist");
    }
  }, [postDoc]);

  const savePostData = async () => {
    setSaving(true);

    await updateDoc(postDoc, {
      body: post.body,
      title: post.title,
      tags: post.tags,
    });

    setSaving(false);
    router.reload();
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const isLoading = useMemo(() => !post || saving, [post, saving]);

  const [isEditing, setIsEditing] = useState(false);

  const hasDifference = useMemo(
    () =>
      post &&
      ogPost &&
      (post.title !== ogPost.title ||
        post.body !== ogPost.body ||
        post.tags.toString() !== ogPost.tags.toString()),
    [post, ogPost]
  );

  if (error) return <p>{error}</p>;
  if (isLoading) return <div>LOADING...</div>;

  return (
    <>
      <Toast className="bg-green-500 text-white" {...toastProps} />
      <div>
        <div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          ) : (
            <>
              <p>Edit enabled</p>
              {hasDifference && (
                <div className="flex flex-col">
                  <button onClick={savePostData}>Save changes</button>
                  <button onClick={() => router.reload()}>
                    Cancel Changes
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <BlogBodyDiv>
          <BlogViewer
            post={post}
            storageToUrl={async (name) => {
              return await getDownloadURL(
                ref(storage, `blog-posts-${locale}/${post.id}/${name}`)
              );
            }}
            storageToBytes={async (id) => {
              return await getBytes(
                ref(storage, `blog-posts-${locale}/${post.id}/${id}`)
              );
            }}
            canEdit={isEditing}
            onTitleEdited={(value) =>
              setPost((post) => ({ ...post, title: value }))
            }
            onBodyEdited={(body) => setPost((post) => ({ ...post, body }))}
          />
        </BlogBodyDiv>
        {isEditing && (
          <div>
            <ImageManager
              canUpload={canUploadImage}
              onDelete={async (img) => {
                imageStorage.deleteFile(
                  ref(storage, `blog-posts-${locale}/${id}/${img.name}`)
                );
              }}
              images={images}
              onImageClick={async ({ name }) => {
                await navigator.clipboard.writeText(
                  `![Description here](STORAGE::${name}::)`
                );
                setToastText("Copied to clipboard!");
              }}
              onUpload={onUploadImage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
  params,
}) => {
  const { id, privacy } = params;
  const isPrivate = privacy === "private";

  return {
    props: {
      id: id as string,
      isPrivate,
      locale: locale as Locale,
    },
  };
};

export default AdminBlogPage;
