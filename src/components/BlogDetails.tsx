import axios, { AxiosError } from 'axios';
import React, { useRef, useState } from 'react';
import { SlLike } from 'react-icons/sl';
import { ErrorResponse } from '../types/error';
import { toast } from 'sonner';
import { useAppSelector } from '../redux/hooks';
import TimeAgo from './TimeAgo';

interface BlogDetailProps {
  title: string;
  content: string;
  likes: number;
  comments: {
    text: string;
    createdAt: string;
    author: { firstName: string };
  }[];
  id: string;
  createdAt: string;
  addComment: (comment: string) => Promise<void>;
}

const BlogDetail: React.FC<BlogDetailProps> = ({
  title,
  content,
  likes,
  comments,
  id,
  addComment,
  createdAt,
}) => {
  const [like, setLike] = useState(likes);
  const commentRef = useRef<HTMLInputElement>(null);
  const token = useAppSelector((state) => state.auth.user);

  async function handleLikes() {
    try {
      const response = await axios.put(
        `https://blog-app-backend-8yjk.onrender.com/api/blogs/fetch-blogs/${id}/like`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        setLike((prevState) => prevState! + 1);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response && axiosError.response.data) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    addComment(commentRef.current!.value);
  }

  return (
    <div className="container mx-auto p-4">
      {/* Blog Title */}
      <div className="mb-4">
        <h1 className="text-3xl text-center font-bold">{title}</h1>
        <p className="text-sm text-center text-gray-500">
          {/* Display time with the blog post */}( Posted{' '}
          {new Date(createdAt).toLocaleString()} )
        </p>
      </div>

      {/* Blog Content */}
      <div
        className="prose max-w-none mb-4"
        dangerouslySetInnerHTML={{ __html: content! }}
      />

      {/* Likes */}
      <div className="flex items-center mb-4 gap-2">
        <SlLike className="cursor-pointer" onClick={handleLikes} />
        <span>{like} Likes</span>
      </div>

      {/* Comments Section */}
      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      {/* Add comment form */}
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Add a comment..."
          ref={commentRef}
          className="bg-transparent border border-b-black border-t-0 border-l-0 border-r-0 outline-none px-3 py-2 flex-grow mr-2"
        />
        <button type="submit" className="btn text-white px-4 py-2 rounded-md">
          Post
        </button>
      </form>
      <div className="mb-4">
        {/* Map over comments and display each comment */}
        {comments!.length <= 0 ? (
          <p className="mt-4">No Comments yet</p>
        ) : (
          comments!.map((comment, index) => (
            <div key={index} className="mb-2">
              <p className="">
                {comment.author.firstName}{' '}
                <span className="text-xs text-gray-500">
                  <TimeAgo date={comment.createdAt} />
                </span>
              </p>
              <p className="text-gray-800">{comment.text}</p>
              {/* Display time with each comment */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
