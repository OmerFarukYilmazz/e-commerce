import { useForm } from "react-hook-form";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/clientAction";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from || '/';

  const onSubmit = (data) => {
    dispatch(loginUser(data, history, from));
  };

  return (
    <section className="flex justify-center py-10">
      <div className="flex flex-col items-center shadow-lg w-[600px] pb-10 gap-5 border-2">
        <div className="flex justify-between w-full text-3xl text-primary border-b-2">
          <Link
            className="basis-[48%] text-center bg-primary text-white py-4"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="basis-[48%] text-center hover:bg-primary hover:text-white py-4"
            to="/register"
          >
            Register
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5 w-[80%] text-lg"
        >
          <div className="w-full">
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className={`py-5 rounded-md bg-bgInput w-full pl-4 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Your Password"
              className={`py-5 rounded-md bg-bgInput w-full pl-4 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", {
                required: "Password is required"
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="w-full flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="mr-2"
              {...register("rememberMe")}
            />
            <label htmlFor="rememberMe" className="font-medium text-gray-700">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className={`w-full flex items-center justify-center mt-4 text-xl py-4 px-10 
              rounded-md text-white ${isSubmitting ? "bg-gray-500" : "bg-primary"}
              ${errors.length ? "cursor-not-allowed" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};


/* Old Method - Without Redux
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { sendRequest, METHODS } from '../utils/axiosUtil';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest({
        url: '/login',
        method: METHODS.POST,
        data: {
          email: formData.email,
          password: formData.password
        }
      });

      if (formData.rememberMe) {
        localStorage.setItem('token', response.token);
      }

      toast.success('Successfully logged in!');
      history.push('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed!');
    }
  };

  return (
    // ... form JSX
  );
};
*/