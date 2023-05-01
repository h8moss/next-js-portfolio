import Link from "next/link";
import { useState } from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";

import {
  deleteBlogPost,
  setBlogAsDraft,
  toggleBlogPrivacy,
} from "../../../../services/firebase/functions";
import { AdminBlog } from "../types";
import style from "./BlogTile.module.css";

interface Props {
  post: AdminBlog;
  onSuccess?: (path?: string | undefined) => unknown;
}

const BlogTile = ({
  post: { title, isPrivate, id, locale },
  onSuccess,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [doingWork, setDoingWork] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const beginDelete = async () => {
    setDoingWork(true);
    try {
      const result = await deleteBlogPost({ id, isPrivate, locale });
      if (result.data.success && onSuccess) {
        onSuccess();
      }
    } catch (e) {
      console.error(e);
    }
    setDoingWork(false);
  };

  const onToggleVisible = async () => {
    setDoingWork(true);
    try {
      const result = await toggleBlogPrivacy({ id, isPrivate, locale });
      if (result.data.success && onSuccess) {
        onSuccess();
      }
    } catch (e) {
      console.error({ e });
    }
    setDoingWork(false);
  };

  const onSetDraft = async () => {
    setDoingWork(true);
    try {
    const result = await setBlogAsDraft({ id, isPrivate, locale });
      if (result.data.success && onSuccess) {
        onSuccess("/admin/create-blog-post");
      }
    } catch (e) {
      console.error(e);
    }
    setDoingWork(false);
  };

  return (
    <div className="p-2 hover:bg-slate-200 transition-colors flex">
      <div className="flex flex-col flex-1">
        <Link href={`/admin/blog/${isPrivate ? "private" : "public"}/${id}`}>
          {doingWork
            ? "Please wait..."
            : isDeleting
            ? "Are you sure you want to delete?"
            : title}
        </Link>
        {isDeleting && (
          <div className="flex">
            <button
              className="p-2 bg-red-500 text-white rounded-sm m-2"
              onClick={beginDelete}
              disabled={doingWork}
            >
              Yes
            </button>
            <button
              className="p-2 bg-slate-100 text-slate-600 rounded-sm m-2"
              onClick={() => setIsDeleting(false)}
              disabled={doingWork}
            >
              Cancel
            </button>
          </div>
        )}
        {isEditing && (
          <div className="flex">
            <button
              className="bg-blue-500 text-white hover:bg-blue-600
                          rounded-sm m-2 p-2"
              disabled={doingWork}
              onClick={onSetDraft}
            >
              Set as draft
            </button>
            <button
              className="bg-slate-500 text-white hover:bg-slate-600
                          rounded-sm m-2 p-2"
              disabled={doingWork}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className={style.blogButtons}>
        <button
          className={style.tooltip}
          data-tooltip="Delete this blog post"
          onClick={() => setIsDeleting(true)}
          disabled={doingWork || isDeleting || isEditing}
        >
          <AiFillDelete />
        </button>
        <button
          className={style.tooltip}
          data-tooltip={"Make " + (isPrivate ? "public" : "private")}
          disabled={doingWork || isDeleting || isEditing}
          onClick={onToggleVisible}
        >
          {isPrivate ? <AiFillEye /> : <AiFillEyeInvisible />}
        </button>
        <button
          className={style.tooltip}
          data-tooltip="Edit this blog post"
          disabled={doingWork || isDeleting || isEditing}
          onClick={() => setIsEditing(true)}
        >
          <AiFillEdit />
        </button>
      </div>
    </div>
  );
};

export default BlogTile;
