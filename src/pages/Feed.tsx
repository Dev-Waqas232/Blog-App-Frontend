import BlogList from '../components/BlogList';
import Spinner from '../components/Spinner';
import BlogHeader from '../components/BlogHeader';
import axios from '../utils/axiosConfig';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';

export type Blog = {
  author: string;
  category: string;
  content: string;
  createdAt: string;
  tags: [string];
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
  comments: {
    text: string;
    createdAt: string;
    author: { firstName: string };
  }[];
  likes: number;
};

export default function Feed() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [preference, setPreference] = useState(true);
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.user);

  const preferenceFetchBlogs = async (api: string) => {
    try {
      setIsLoading(true);
      setBlogs([]);
      const response = await axios.get(api, {
        headers: {
          Authorization: token,
        },
      });
      setBlogs(response.data.blogs);
      setPreference(response.data.preferences);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    preferenceFetchBlogs(
      `https://blog-app-backend-8yjk.onrender.com/api/blogs/fetch-blogs?preference=${preference}`
    );
  }, []);
  return (
    <section className="flex flex-col mt-10 gap-10 min-h-[86vh] items-center font-bodyFont">
      <BlogHeader
        preference={preference}
        setPreference={setPreference}
        fetchBlogs={preferenceFetchBlogs}
        user={user}
        setUser={setUser}
      />
      {isLoading ? (
        <Spinner />
      ) : blogs.length > 0 ? (
        <BlogList blogs={blogs} />
      ) : (
        <p>No Blogs Found</p>
      )}
    </section>
  );
}
