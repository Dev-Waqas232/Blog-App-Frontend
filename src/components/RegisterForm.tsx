import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios, { AxiosError } from 'axios';
import Spinner from './Spinner';
import { useAppDispatch } from '../redux/hooks';
import { login } from '../redux/slices/auth-slice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type ErrorResponse = {
  message: string;
  ok: boolean;
};

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const naviagte = useNavigate();

  return (
    <div className="flex justify-center items-center hero min-h-screen pb-10">
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        validate={(values) => {
          const errors: Partial<FormValues> = {};
          if (!values.firstName) {
            errors.firstName = 'Please enter your first name';
          }
          if (!values.lastName) {
            errors.lastName = 'Please enter your last name';
          }
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
              'https://blog-app-backend-8yjk.onrender.com/api/auth/register',
              values
            );
            dispatch(login(response.data.token));
            toast.success('Registered successfully');
            naviagte('/welcome');
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
          <Form className="font-bodyFont form rounded mt-20 px-8 pt-6 pb-8  lg:w-1/3">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block  text-sm font-bold mb-2"
              >
                First Name
              </label>
              <Field
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-800 text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block  text-sm font-bold mb-2"
              >
                Last Name
              </label>
              <Field
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-800 text-xs italic"
              />
            </div>
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
                {isSubmitting ? <Spinner /> : 'Register'}
              </button>
            </div>
            <div className="text-center mt-4 text-sm">
              <Link to="/auth/login">
                Already have an account ?{' '}
                <span className="italic">Sign in</span>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
