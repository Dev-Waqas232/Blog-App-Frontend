import { FormEvent, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '../redux/hooks';
import { toast } from 'sonner';
import { ErrorResponse } from '../types/error';

type AddBlogModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: string;
};

const AddBlogModal = ({ isOpen, onClose, content }: AddBlogModalProps) => {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const user = useAppSelector((state) => state.auth.user);

  const commonCategories = [
    'Technology',
    'Health',
    'Travel',
    'Food',
    'Fashion',
    'Books',
    'Movies',
    'Music',
    'Sports',
  ];

  const validateForm = () => {
    const error = [];
    if (content == '') {
      error.push('Please enter some content');
    }
    if (title == '') {
      error.push('Please give some title');
    }
    if (categories == '') {
      error.push('Please choose any category');
    }
    if (tags.length === 0) {
      error.push('Please give at least one tag');
    }
    return error[0];
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const response = await axios.post(
        'https://blog-app-backend-8yjk.onrender.com/api/blogs/add-blog',
        { title, category: categories, tags, content },
        {
          headers: {
            Authorization: user,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response && axiosError.response.data) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      onClose();
    }
    console.log();
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    if (e.target.value.endsWith(',')) {
      handleAddTag();
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom font-bodyFont rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className=" w-[90%] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex w-[100%] sm:items-start">
                    <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium"
                      >
                        Add Blog Details
                      </Dialog.Title>
                      <div className="mt-2">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="mt-1 p-2 block w-[100%] shadow-md focus:ring-buttonBg focus:border-buttonBg border-buttonBg outline-none border-2 rounded-md"
                          required
                        />
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="categories"
                          className="block text-sm font-medium "
                        >
                          Categories
                        </label>
                        <select
                          id="categories"
                          name="categories"
                          value={categories}
                          onChange={(e) => setCategories(e.target.value)}
                          className="mt-1 p-2 block w-full shadow-md  focus:ring-buttonBg focus:border-buttonBg border-buttonBg outline-none border-2 rounded-md"
                        >
                          <option value="">Select Category</option>
                          {commonCategories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4 mt-4">
                        <label
                          htmlFor="tags"
                          className="block text-sm font-medium"
                        >
                          Tags ( Use comma to add tags )
                        </label>
                        <input
                          type="text"
                          name="tags"
                          id="tags"
                          value={tagInput}
                          onChange={handleTagInputChange}
                          className="mt-1 p-2 block w-full focus:ring-buttonBg focus:border-buttonBg border-buttonBg outline-none border-2 rounded-md"
                        />
                      </div>
                      {tags.length > 0 && (
                        <small>Click on tag to remove it</small>
                      )}
                      <div className="flex flex-wrap">
                        {tags.map((tag, index) => (
                          <div
                            key={index}
                            className="bg-gray-200 px-2 py-1 text-sm rounded-md m-1 cursor-pointer"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={onClose}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddBlogModal;
