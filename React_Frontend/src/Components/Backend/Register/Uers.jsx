import { useState, useContext} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../context/UserAuth';

function Uers() {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const {login} = useContext(UserAuthContext);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/api/user_register', {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
            });

            const result = await response.json();

      if (result.status == false) {
        toast.error(result.message); 
      } else {

        const userRegisterInfo = {
          id: result.id,
          token: result.token,
         
        }
        localStorage.setItem('userRegisterInfo', JSON.stringify(userRegisterInfo));
        login(userRegisterInfo);   
        navigate('/dashboard'); 
        
      }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert("Registration failed: " + JSON.stringify(error.response.data.errors));
            }
        }
    };

    // Watch password and confirm password fields
    const password = watch("password", "");
    const confirmPassword = watch("password_confirmation", "");

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="w-full px-4 py-2 mt-1 border rounded"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full px-4 py-2 mt-1 border rounded"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum length is 8' } })}
                                className="w-full px-4 py-2 mt-1 border rounded"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register('password_confirmation', { required: 'Please confirm your password' })}
                                className="w-full px-4 py-2 mt-1 border rounded"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation.message}</p>}
                        {password && confirmPassword && password !== confirmPassword && (
                            <p className="text-red-500">Passwords do not match</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
                        disabled={!password || !confirmPassword || password !== confirmPassword}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}



export default Uers;