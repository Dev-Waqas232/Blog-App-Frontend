import { useState } from 'react';
import {
  MdBiotech,
  MdOutlineHealthAndSafety,
  MdOutlineFoodBank,
  MdOutlineLocalMovies,
  MdOutlineSportsVolleyball,
} from 'react-icons/md';
import { SiYourtraveldottv } from 'react-icons/si';
import { GiBallerinaShoes, GiBookshelf, GiMusicalNotes } from 'react-icons/gi';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Spinner from './Spinner';
import { ErrorResponse } from '../types/error';

type Category = {
  name: string;
  icon: JSX.Element;
};

export default function InterestList() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const commonCategories: Category[] = [
    { name: 'Technology', icon: <MdBiotech /> },
    { name: 'Health', icon: <MdOutlineHealthAndSafety /> },
    { name: 'Travel', icon: <SiYourtraveldottv /> },
    { name: 'Food', icon: <MdOutlineFoodBank /> },
    { name: 'Fashion', icon: <GiBallerinaShoes /> },
    { name: 'Books', icon: <GiBookshelf /> },
    { name: 'Movies', icon: <MdOutlineLocalMovies /> },
    { name: 'Music', icon: <GiMusicalNotes /> },
    { name: 'Sports', icon: <MdOutlineSportsVolleyball /> },
  ];

  const toggleCategory = (index: number) => {
    if (selectedCategories.includes(index)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== index)
      );
    } else {
      setSelectedCategories([...selectedCategories, index]);
    }
  };

  const isCategorySelected = (index: number) => {
    return selectedCategories.includes(index);
  };

  const handleAddPreferences = async () => {
    const preferences = selectedCategories.map(
      (category) => commonCategories[category].name
    );

    if (preferences.length < 3) {
      toast.error('Please choose at least 3 categories');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://blog-app-backend-8yjk.onrender.com/api/user-preferences',
        { preferences },
        {
          headers: {
            Authorization: user,
          },
        }
      );
      toast.success(response.data.message);
      navigate('/feed');
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response && axiosError.response.data) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="font-bodyFont w-[90%] m-auto flex flex-col items-center pt-8">
      <div className="text-center">
        <h2 className="text-3xl">
          Welcome to <span className="font-headingFont">Insightful Pages</span>
        </h2>
        <p className="capitalize">
          Choose your interests and personalize your feed with topics you love{' '}
          <small>( Choose at least 3 )</small>
        </p>
      </div>
      <div className="flex gap-2 flex-wrap justify-center w-[100%] mt-8">
        {commonCategories.map((category, index) => (
          <div
            key={index}
            className={`w-[370px] h-16 border-4 cursor-pointer hover:shadow-lg border-buttonBg flex justify-center items-center mb-4 rounded-md ${
              isCategorySelected(index) ? 'bg-gray-200' : ''
            }`}
            onClick={() => toggleCategory(index)}
          >
            <p className="flex w-[80%] m-auto justify-between">
              {category.name}{' '}
              <span className="text-2xl text-buttonBg">{category.icon}</span>{' '}
            </p>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={handleAddPreferences}
          disabled={isLoading}
          className="flex justify-center items-center btn w-20 mb-8"
        >
          {isLoading ? <Spinner /> : 'Done'}
        </button>
      </div>
    </section>
  );
}
