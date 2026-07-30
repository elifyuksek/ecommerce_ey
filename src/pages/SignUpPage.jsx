import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { API } from '../api/api';

export default function SignUpPage() {
  const [roles, setRoles] = useState([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      role_id: '3' 
    }
  });

  const selectedRoleId = watch('role_id');
  
  const password = watch('password');

  useEffect(() => {
    API.get('/roles')
      .then((res) => {
        setRoles(res.data);
        setIsLoadingRoles(false);
        
        const customerRole = res.data.find(role => role.code.toLowerCase() === 'customer');
        if (customerRole) {
        }
      })
      .catch((err) => {
        console.error('Roles fetch error:', err);
        setIsLoadingRoles(false);
      });
  }, []);

  const isStoreSelected = () => {
    const activeRole = roles.find(r => String(r.id) === String(selectedRoleId));
    return activeRole && activeRole.code.toLowerCase() === 'store';
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    setApiError('');
    setSuccessMessage('');

    let payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: Number(data.role_id)
    };

    if (isStoreSelected()) {
      payload.store = {
        name: data.storeName,
        phone: data.storePhone,
        tax_no: data.storeTaxNo,
        bank_account: data.storeBankAccount
      };
    }

    API.post('/signup', payload)
      .then((res) => {
        setIsSubmitting(false);
        setSuccessMessage('You need to click link in email to activate your account!');
        
        setTimeout(() => {
          window.history.back();
          setTimeout(() => {
            window.dispatchEvent(new Event('navigationChange'));
          }, 100);
        }, 3000);
      })
      .catch((err) => {
        setIsSubmitting(false);
        const msg = err.response?.data?.message || 'Something went wrong during sign up!';
        setApiError(msg);
      });
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-lg bg-white rounded-md border border-gray-100 p-8 shadow-sm flex flex-col gap-6">
        
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-[#252B42]">Create an Account</h2>
          <p className="text-sm text-[#737373]">Sign up to start discovering great deals!</p>
        </div>

        {successMessage && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-sm font-bold rounded-md">
            {successMessage}
          </div>
        )}
        {apiError && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-bold rounded-md">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#252B42] uppercase">Name</label>
            <input 
              type="text" 
              placeholder="Your Name"
              {...register('name', { 
                required: 'Name is required', 
                minLength: { value: 3, message: 'Name must be at least 3 characters' } 
              })}
              className="border border-[#E6E6E6] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#23A6F0]"
            />
            {errors.name && <span className="text-xs text-red-500 font-bold">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#252B42] uppercase">Email</label>
            <input 
              type="email" 
              placeholder="Your Email Address"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter a valid email address'
                }
              })}
              className="border border-[#E6E6E6] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#23A6F0]"
            />
            {errors.email && <span className="text-xs text-red-500 font-bold">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#252B42] uppercase">Password</label>
            <input 
              type="password" 
              placeholder="At least 8 characters"
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/,
                  message: 'Must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character'
                }
              })}
              className="border border-[#E6E6E6] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#23A6F0]"
            />
            {errors.password && <span className="text-xs text-red-500 font-bold">{errors.password.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#252B42] uppercase">Confirm Password</label>
            <input 
              type="password" 
              placeholder="Repeat your password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              className="border border-[#E6E6E6] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#23A6F0]"
            />
            {errors.confirmPassword && <span className="text-xs text-red-500 font-bold">{errors.confirmPassword.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#252B42] uppercase">Role</label>
            {isLoadingRoles ? (
              <div className="text-xs text-[#737373] font-bold py-2">Roles loading...</div>
            ) : (
              <select 
                {...register('role_id', { required: 'Please select a role' })}
                className="border border-[#E6E6E6] rounded-md px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#23A6F0] cursor-pointer"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            )}
            {errors.role_id && <span className="text-xs text-red-500 font-bold">{errors.role_id.message}</span>}
          </div>

          {isStoreSelected() && (
            <div className="flex flex-col gap-4 border-l-4 border-[#23A6F0] pl-4 py-2 my-2 bg-sky-50/30 rounded-r-md">
              <h3 className="text-sm font-bold text-[#23A6F0]">Store Information</h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#252B42]">Store Name</label>
                <input 
                  type="text" 
                  placeholder="Your Store Name"
                  {...register('storeName', { 
                    required: 'Store Name is required',
                    minLength: { value: 3, message: 'Store Name must be at least 3 characters' }
                  })}
                  className="border border-[#E6E6E6] bg-white rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#23A6F0]"
                />
                {errors.storeName && <span className="text-xs text-red-500 font-bold">{errors.storeName.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#252B42]">Store Phone</label>
                <input 
                  type="text" 
                  placeholder="+905XXXXXXXXX"
                  {...register('storePhone', { 
                    required: 'Store Phone is required',
                    pattern: {
                      value: /^((\+|00)?90|0)?5[0-9]{9}$/,
                      message: 'Please enter a valid Türkiye phone number (e.g. 05XXXXXXXXX)'
                    }
                  })}
                  className="border border-[#E6E6E6] bg-white rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#23A6F0]"
                />
                {errors.storePhone && <span className="text-xs text-red-500 font-bold">{errors.storePhone.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#252B42]">Store Tax ID</label>
                <input 
                  type="text" 
                  placeholder="TXXXXVXXXXXX"
                  {...register('storeTaxNo', { 
                    required: 'Store Tax ID is required',
                    pattern: {
                      value: /^T\d{4}V\d{6}$/,
                      message: 'Tax ID must match "TXXXXVXXXXXX" format (e.g. T1234V567890)'
                    }
                  })}
                  className="border border-[#E6E6E6] bg-white rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#23A6F0]"
                />
                {errors.storeTaxNo && <span className="text-xs text-red-500 font-bold">{errors.storeTaxNo.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#252B42]">Store Bank Account (IBAN)</label>
                <input 
                  type="text" 
                  placeholder="TRXX XXXX XXXX XXXX XXXX XXXX XX"
                  {...register('storeBankAccount', { 
                    required: 'IBAN is required',
                    pattern: {
                      value: /^TR\d{2}\s?(?:\d{4}\s?){5}\d{2}$/,
                      message: 'Please enter a valid Türkiye IBAN address'
                    }
                  })}
                  className="border border-[#E6E6E6] bg-white rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#23A6F0]"
                />
                {errors.storeBankAccount && <span className="text-xs text-red-500 font-bold">{errors.storeBankAccount.message}</span>}
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full text-white font-bold text-sm py-4 rounded-md transition-all flex items-center justify-center gap-2 mt-4 
              ${isSubmitting ? 'bg-[#A3D9F9] cursor-not-allowed' : 'bg-[#23A6F0] hover:bg-sky-600'}`}
          >
            {isSubmitting && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>

        </form>
      </div>
    </div>
  );
}