import { useNavigate } from "react-router-dom";
import { Blog } from "../pages/Feed";
import { SlLike } from "react-icons/sl";
import TimeAgo from "./TimeAgo";

type BlogListProps = {
  blogs: Blog[];
};

export default function BlogList({ blogs }: BlogListProps) {
  const navigate = useNavigate();

  function handleBlogClick(id: string) {
    navigate(`/feed/${id}`);
  }

  return (
    <section className="flex lg:w-[50%] w-[90%] justify-between flex-col">
      {blogs.map((blog) => (
        <div
          onClick={() => {
            handleBlogClick(blog._id);
          }}
          key={blog._id}
          className="flex cursor-pointer flex-row max-sm:flex-col mb-8 w-full rounded-md border-2 border-buttonBg"
        >
          <div className="w-56 max-sm:w-[100%]">
            <img
              src="https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
              alt="No image"
              className="h-auto rounded-md max-sm:w-[100%]"
            />
          </div>
          <div className="flex-1 flex flex-col max-sm:mt-4 justify-center px-4">
            <p className="text-lg font-bold mb-2">{blog.title}</p>
            <p className="text-sm text-gray-500">
              Posted <TimeAgo date={blog.createdAt} />
            </p>
            <div className="mt-8 max-sm:mb-4">
              <p>Author : {blog.author}</p>
              <p className="text-sm">Tags : {blog.tags.join(",")} </p>
              <small className="flex items-center gap-1">
                <SlLike />
                {blog.likes}
              </small>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
