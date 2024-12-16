import { useState } from "react"; // useState'i ekledik
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom"; // useHistory'i ekledik
import { METHODS, sendRequest } from "../../utils/axiosUtil";
import { useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRoles } from '../../store/actions/clientAction';



const RegisterForm = () => {
  //const history = useHistory(); // Yönlendirme için
  const [error, setError] = useState(null); // Hata mesajı için
  const roles = useSelector(state => state.client.roles);
  const dispatch = useDispatch();

  // Rolleri çek
  useEffect(() => {
    console.log('Fetching roles...'); // Test için
    dispatch(fetchRoles());
  }, [dispatch]);

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,// password eşleşmesi için bunu ekledik
    formState: { errors , isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role_id: 3, // Default Customer
      store: {
        name: "",
        phone: "",
        tax_no: "",
        bank_account: "",
      },
    },
    mode: "onChange", // Validasyonların anında çalışması için bu satırı ekledik
  });

  const password = watch("password"); // password eşleşmesi için bunu ekledik
  const role_id = watch("role_id"); // role_id'yi gözlemle

  // Form gönderimi için yeni fonksiyon
  const onSubmit = async(data) => {
    console.log('Form is submitting, isSubmitting:', isSubmitting); // test için
    
    setError(null); // Her submit'te hata mesajını sıfırla
    // confirmPassword'ü çıkar, role_id'yi number'a çevir
    const { confirmPassword, ...submitData } = data;
    submitData.role_id = Number(submitData.role_id);

    //await new Promise(resolve => setTimeout(resolve, 3000)); // Test için 3 saniyelik gecikme
  
    await sendRequest({
      url: "/signup",
      method: METHODS.POST,
      data: submitData
    })
      .then(response => {
        console.log('Success:', response);
        toast.success("Hesabınız oluşturuldu! Aktivasyon için e-postanızı kontrol edin.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error(error.response?.data?.message || "Kayıt sırasında bir hata oluştu!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setError(error.response?.data?.message || "An error occurred during registration");
      });
  };
   
  
  // Old Method (Without useForm)
  /*
  // Form Data State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role_id: 3, // Default Customer
  });

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // API'ye gönderilecek veriyi hazırla
    const submitData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role_id: Number(formData.role_id) // string'i number'a çevir
    };

    sendRequest({
      url: "/signup",
      method: METHODS.POST,
      data: submitData
    })
      .then(response => {
        console.log('Success:', response);
        // Başarılı kayıt işlemi sonrası yapılacaklar
      })
      .catch(error => {
        console.error('Error:', error);
        // Hata durumunda yapılacaklar
      });
  };
  */

 
  return (
    <section className="flex justify-center py-10">
      <div className="flex flex-col items-center shadow-lg w-[600px] pb-10 gap-5 border-2">
        <div className="flex justify-between w-full text-3xl border-b-2">
          <Link
            className="basis-[48%] text-center hover:bg-blue-500 hover:text-white py-4"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="basis-[48%] text-center bg-blue-500 text-white py-4"
            to="/register"
          >
            Register
          </Link>
        </div>

        {/* Hata mesajı */}
        {error && (
          <div className="w-[80%] p-4 text-red-500 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        
        { /* old method */ /* <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 w-[80%] text-lg"></form> */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 w-[80%] text-lg">
          {/* Name Input */}
          <div className="w-full">
            <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              /*value={formData.name}
              onChange={handleChange}*/
              className={`py-5 rounded-md w-full px-4 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long"
                }
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="w-full">
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"              
              /*value={formData.email}
              onChange={handleChange}*/
              className={`py-5 rounded-md w-full px-4 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format"
                }
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="w-full">
            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className={`py-5 rounded-md w-full px-4 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", {
                required: "Password is required",
                validate: {
                  length: value => 
                    value.length >= 8 || "Password must be at least 8 characters long, Password must include numbers, lowercase, uppercase and special characters",
                  hasNumber: value => 
                    /\d/.test(value) || "Password must contain at least 1 number",
                  hasUpper: value => 
                    /[A-Z]/.test(value) || "Password must contain at least 1 uppercase letter",
                  hasLower: value => 
                    /[a-z]/.test(value) || "Password must contain at least 1 lowercase letter",
                  hasSpecial: value => 
                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) || 
                    "Password must contain at least 1 special character (!@#$%^&*()_+-=[]{}|;:'\",.<>/?)"
                }
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="w-full">
            <label htmlFor="confirmPassword" className="block mb-2 font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              /*value={formData.confirmPassword}
              onChange={handleChange}*/
              className={`py-5 rounded-md w-full px-4 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              {...register("confirmPassword", { 
                required: "Please confirm your password" ,
                validate: value => value === password || "Passwords do not match" 
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Role Selection */}
          <div className="w-full">
            <label htmlFor="role_id" className="block mb-2 font-medium text-gray-700">
              Role
            </label>
            <select
              id="role_id"
              name="role_id"
              /*value={formData.role_id}
              onChange={handleChange}*/
              className={`py-5 rounded-md w-full px-4 border ${
                errors.role_id ? "border-red-500" : "border-gray-300"
              }`}
              {...register("role_id")}
            >
              {roles?.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Store Alanları - role_id 3 (Store) seçiliyse göster */}
          {role_id === "2" && (
            <>
              {/* Store Name */}
              <div className="w-full">
                <label htmlFor="store.name" className="block mb-2 font-medium text-gray-700">
                  Store Name
                </label>
                <input
                  type="text"
                  id="store.name"
                  placeholder="Enter store name"
                  className={`py-5 rounded-md w-full px-4 border ${
                    errors.store?.name ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("store.name", {
                    required: "Store name is required",
                    minLength: {
                      value: 3,
                      message: "Store name must be at least 3 characters long"
                    }
                  })}
                />
                {errors.store?.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.store.name.message}</p>
                )}
              </div>

              {/* Store Phone */}
              <div className="w-full">
                <label htmlFor="store.phone" className="block mb-2 font-medium text-gray-700">
                  Store Phone
                </label>
                <input
                  type="tel"
                  id="store.phone"
                  placeholder="Enter store phone"
                  className={`py-5 rounded-md w-full px-4 border ${
                    errors.store?.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("store.phone", {
                    required: "Store phone is required",
                    pattern: {
                      value: /^(\+90|0)?[0-9]{10}$/,
                      message: "Please enter a valid Turkish phone number"
                    }
                  })}
                />
                {errors.store?.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.store.phone.message}</p>
                )}
              </div>

              {/* Store Tax ID */}
              <div className="w-full">
                <label htmlFor="store.tax_no" className="block mb-2 font-medium text-gray-700">
                  Tax ID
                </label>
                <input
                  type="text"
                  id="store.tax_no"
                  placeholder="Enter tax ID"
                  className={`py-5 rounded-md w-full px-4 border ${
                    errors.store?.tax_no ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("store.tax_no", {
                    required: "Tax ID is required",
                    pattern: {
                      value: /^T\d{9}V\d{2}$/,
                      message: "Please enter a valid tax ID (TXXXXXXXXVXX)"
                    }
                  })}
                />
                {errors.store?.tax_no && (
                  <p className="text-red-500 text-sm mt-1">{errors.store.tax_no.message}</p>
                )}
              </div>

              {/* Store Bank Account */}
              <div className="w-full">
                <label htmlFor="store.bank_account" className="block mb-2 font-medium text-gray-700">
                  Bank Account (IBAN)
                </label>
                <input
                  type="text"
                  id="store.bank_account"
                  placeholder="Enter IBAN"
                  className={`py-5 rounded-md w-full px-4 border ${
                    errors.store?.bank_account ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("store.bank_account", {
                    required: "Bank account is required",
                    pattern: {
                      value: /^TR\d{24}$/,
                      message: "Please enter a valid Turkish IBAN"
                    }
                  })}
                />
                {errors.store?.bank_account && (
                  <p className="text-red-500 text-sm mt-1">{errors.store.bank_account.message}</p>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isSubmitting} // Form gönderilirken butonu devre dışı bırak
            className={`w-full py-4 px-6 text-white rounded-md ${
              isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;