import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios, { AxiosError } from 'axios';
import Spinner from './Spinner';
import { useAppDispatch } from '../redux/hooks';
import { login } from '../redux/slices/auth-slice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ErrorResponse } from '../types/error';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center hero h-screen">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors: Partial<FormValues> = {};
          if (!values.email) {
            errors.email = 'Email is required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Password is required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post(
              'https://blog-app-backend-8yjk.onrender.com/api/auth/login',
              values
            );
            dispatch(login(response.data.token));
            toast.success('Sign in successfully');
            navigate('/feed');
          } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response && axiosError.response.data) {
              toast.error(axiosError.response.data.message);
            } else {
              toast.error('An unexpected error occurred.');
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="font-bodyFont form rounded px-8 pt-6 pb-8 mb-4 lg:w-1/3">
            <div className="mb-4">
              <label htmlFor="email" className="block  text-sm font-bold mb-2">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-800 text-xs italic"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block  text-sm font-bold mb-2"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-20 flex justify-center items-center"
              >
                {isSubmitting ? <Spinner /> : 'Sign In'}
              </button>
            </div>
            <div className="text-center mt-4 text-sm">
              <Link to="/auth/register">
                Don't have an account ? <span className="italic">Sign up</span>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
