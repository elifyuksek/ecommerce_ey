import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { API } from '../api/api';

export default function SignUpPage() {
  const [roles, setRoles] = useState([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  const [rolesFetchError, setRolesFetchError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      role_id: ''
    }
  });

  const selectedRoleId = watch('role_id');
  const password = watch('password');

  useEffect(() => {
    setIsLoadingRoles(true);
    API.get('/roles')
      .then((res) => {
        const fetchedRoles = res.data || [];
        setRoles(fetchedRoles);
        setIsLoadingRoles(false);
        
        const customerRole = fetchedRoles.find(
          role => (role.code && role.code.toLowerCase() === 'customer') || 
                  (role.name && role.name.toLowerCase() === 'customer')
        );

        if (customerRole) {
          setValue('role_id', String(customerRole.id));
        } else if (fetchedRoles.length > 0) {
          setValue('role_id', String(fetchedRoles[0].id));
        }
      })
      .catch((err) => {
        console.error('Roles fetch error:', err);
        setRolesFetchError('Failed to load user roles. Please check CORS/backend settings.');
        setIsLoadingRoles(false);
      });
  }, [setValue]);

  
  const activeRole = roles.find(r => String(r.id) === String(selectedRoleId));
  const isStore = activeRole && (
    (activeRole.code && activeRole.code.toLowerCase() === 'store') ||
    (activeRole.name && activeRole.name.toLowerCase() === 'store')
  );

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

    if (isStore) {
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
        setSuccessMessage('Account created successfully! Redirecting...');
        
        setTimeout(() => {
          window.history.back();
          setTimeout(() => {
            window.dispatchEvent(new Event('navigationChange'));
          }, 100);
        }, 2000);
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
        {rolesFetchError && (
          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold rounded-md">
            {rolesFetchError}
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
                minLength: { value: 8, message: 'Password must be at least 8 characters' }
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
                    {role.name || role.code}
                  </option>
                ))}
              </select>
            )}
            {errors.role_id && <span className="text-xs text-red-500 font-bold">{errors.role_id.message}</span>}
          </div>

          {isStore && (
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
                    required: 'Store Phone is required'
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
                    required: 'Store Tax ID is required'
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
                    required: 'IBAN is required'
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
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>

        </form>
      </div>
    </div>
  );
}