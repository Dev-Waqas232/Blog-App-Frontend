import { RxMagicWand } from 'react-icons/rx';
import { MdOutlineCloseFullscreen } from 'react-icons/md';
import { IoPersonOutline } from 'react-icons/io5';
import { toast } from 'sonner';

type BlogHeaderProps = {
  preference: boolean;
  setPreference: React.Dispatch<React.SetStateAction<boolean>>;
  fetchBlogs: (api: string) => void;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
  user: boolean;
};

export default function BlogHeader({
  preference,
  setPreference,
  fetchBlogs,
  user,
  setUser,
}: BlogHeaderProps) {
  function handlePreferenceClick() {
    if (user) {
      setUser(false);
    }
    if (!preference) {
      setPreference(true);
      fetchBlogs(
        `https://blog-app-backend-8yjk.onrender.com/api/blogs/fetch-blogs?preference=${preference}`
      );
    } else {
      toast.info('Already Personalized');
    }
  }

  function handleAllClick() {
    if (preference || user) {
      setUser(false);
      setPreference(false);
      fetchBlogs(
        `https://blog-app-backend-8yjk.onrender.com/api/blogs/fetch-blogs`
      );
    } else {
      toast.info('Already all posts');
    }
  }

  function handleYouClick() {
    if (preference) {
      setPreference(false);
    }
    setUser(true);
    fetchBlogs(
      `https://blog-app-backend-8yjk.onrender.com/api/blogs/fetch-blogs?user=${true}`
    );
  }

  return (
    <section className="flex md:w-[50%] w-[90%] justify-between">
      <div
        onClick={handlePreferenceClick}
        className={`flex gap-2 ${
          preference ? 'text-buttonBg border-2 border-buttonBg' : ''
        } rounded-md p-1 text-sm justify-center items-center cursor-pointer`}
      >
        <RxMagicWand />
        Personalized
      </div>
      <div
        onClick={handleAllClick}
        className={`flex gap-2 ${
          !user && !preference ? 'text-buttonBg border-2 border-buttonBg' : ''
        } rounded-md p-1 text-sm justify-center items-center cursor-pointer`}
      >
        <MdOutlineCloseFullscreen />
        All
      </div>
      <div
        onClick={handleYouClick}
        className={`flex gap-2 ${
          user ? 'text-buttonBg border-2 border-buttonBg' : ''
        } rounded-md p-1 text-sm justify-center items-center cursor-pointer`}
      >
        <IoPersonOutline />
        You
      </div>
    </section>
  );
}
