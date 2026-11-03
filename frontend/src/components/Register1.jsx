
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bg from '../assets/bg.png';
import Message from '../assets/messaging.png';

function Register1() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [inputData, setInputData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confpassword: '',
        number: ''
    });

    const handleInput = (e) => {
        const { id, value } = e.target;

        setInputData({
            ...inputData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (inputData.password !== inputData.confpassword) {
            return setMessage("Password doesn't match");
        }

        setLoading(true);

        try {
            const { confpassword, ...registerData } = inputData;

            const register = await axios.post(
                'http://localhost:4000/user/register',
                registerData,
                {
                    withCredentials: true
                }
            );

            const data = register.data;

            if (!data.success) {
                setMessage(data.message);
                return;
            }

            localStorage.setItem(
                'multiplierAI',
                JSON.stringify(data)
            );

            setMessage('Registration successful!');

            navigate('/login');

        } catch (error) {
            console.log('Register Error:', error);

            setMessage(
                error.response?.data?.message ||
                'Registration failed. Please try again.'
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className='flex justify-center items-center min-h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat py-10'
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className='w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-10'>

                {/* Icon */}
                <div className='flex justify-center items-center mb-5'>
                    <div className='w-18 h-18 bg-purple-600 rounded-2xl flex justify-center items-center'>
                        <img
                            src={Message}
                            alt="message"
                            className='w-12 h-12'
                        />
                    </div>
                </div>

                {/* Heading */}
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>
                        Register <span className='text-purple-600'>Multiplier AI</span>
                    </h1>

                    <p className='text-gray-500 mt-2'>
                        Create your account to continue
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    {/* Full Name and Username */}
                    <div className='flex gap-3'>

                        <div className='mb-5 w-1/2'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Full Name:
                            </label>

                            <input
                                id='fullname'
                                type="text"
                                required
                                value={inputData.fullname}
                                placeholder='Full Name'
                                onChange={handleInput}
                                className='w-full h-10 border border-gray-500 rounded-xl outline-none px-2 focus:border-purple-600'
                            />
                        </div>

                        <div className='mb-5 w-1/2'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Username:
                            </label>

                            <input
                                id='username'
                                type="text"
                                required
                                value={inputData.username}
                                placeholder='Username'
                                onChange={handleInput}
                                className='w-full h-10 border border-gray-500 rounded-xl outline-none px-2 focus:border-purple-600'
                            />
                        </div>

                    </div>

                    {/* Email */}
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Email Address:
                        </label>

                        <input
                            id='email'
                            type="email"
                            required
                            value={inputData.email}
                            placeholder='Enter Email'
                            onChange={handleInput}
                            className='w-full h-10 border border-gray-500 rounded-xl outline-none px-2 focus:border-purple-600'
                        />
                    </div>

                    {/* Number */}
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Mobile Number:
                        </label>

                        <input
                            id='number'
                            type="tel"
                            required
                            value={inputData.number}
                            placeholder='Enter Mobile Number'
                            onChange={handleInput}
                            className='w-full h-10 border border-gray-500 rounded-xl outline-none px-2 focus:border-purple-600'
                        />
                    </div>

                    {/* Password */}
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Password:
                        </label>

                        <input
                            id='password'
                            type="password"
                            required
                            value={inputData.password}
                            placeholder='Enter Password'
                            onChange={handleInput}
                            className='w-full h-10 border border-gray-500 rounded-xl outline-none px-2 focus:border-purple-600'
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Confirm Password:
                        </label>

                        <input
                            id='confpassword'
                            type="password"
                            required
                            value={inputData.confpassword}
                            placeholder='Confirm Password'
                            onChange={handleInput}
                            className='w-full h-10 border border-gray-500 rounded-xl outline-none px-2 focus:border-purple-600'
                        />
                    </div>

                    {/* Message */}
                    {message && (
                        <p className='text-center text-sm text-red-600 mb-4'>
                            {message}
                        </p>
                    )}

                    {/* Register Button */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full h-12 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition disabled:opacity-50'
                    >
                        {loading ? 'Loading...' : 'Register'}
                    </button>

                </form>

                {/* Login */}
                <p className='text-center text-sm text-gray-500 mt-6'>
                    Already have an account?{' '}

                    <Link to='/login'>
                        <span className='text-purple-600 font-semibold cursor-pointer'>
                            Login
                        </span>
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register1;
