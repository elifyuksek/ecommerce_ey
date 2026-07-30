import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../store/actions/clientActions';

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: 'customer@commerce.com',
      password: '123456',
      rememberMe: true
    }
  });

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    const credentials = {
      email: data.email,
      password: data.password
    };

    dispatch(
      loginUserAction(
        credentials,
        data.rememberMe,
        () => {
          setIsSubmitting(false);
          showToast('Login successful! Redirecting...', 'success');
          window.history.pushState({}, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        },
        (errorMsg) => {
          setIsSubmitting(false);
          showToast(errorMsg || 'Invalid email or password!', 'error');
        }
      )
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 px-6 relative overflow-hidden">
      
      {toast.show && (
        <div className={`fixed top-24 right-6 z-50 p-4 rounded-md shadow-md border text-sm font-bold transition-all duration-300 flex items-center gap-2 animate-bounce
          ${toast.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}
        >
          {toast.type === 'success' ? '✓' : '✗'} {toast.message}
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-md border border-gray-100 p-8 shadow-sm flex flex-col gap-6">
        
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-[#252B42]">Welcome Back</h2>
          <p className="text-sm text-[#737373]">Enter your details to sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#252B42] uppercase">Email</label>
            <input 
              type="email" 
              placeholder="Your email address"
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
              placeholder="Your password"
              {...register('password', { required: 'Password is required' })}
              className="border border-[#E6E6E6] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#23A6F0]"
            />
            {errors.password && <span className="text-xs text-red-500 font-bold">{errors.password.message}</span>}
          </div>

          <div className="flex items-center gap-2 py-1">
            <input 
              type="checkbox" 
              id="rememberMe"
              {...register('rememberMe')}
              className="w-4 h-4 text-[#23A6F0] border-gray-300 rounded focus:ring-[#23A6F0] cursor-pointer"
            />
            <label htmlFor="rememberMe" className="text-sm text-[#737373] font-bold cursor-pointer select-none">
              Remember me
            </label>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full text-white font-bold text-sm py-4 rounded-md transition-all flex items-center justify-center gap-2 mt-2 
              ${isSubmitting ? 'bg-[#A3D9F9] cursor-not-allowed' : 'bg-[#23A6F0] hover:bg-sky-600'}`}
          >
            {isSubmitting && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="text-center text-sm text-[#737373] mt-2 font-medium">
            Don't have an account?{' '}
            <button 
              type="button" 
              onClick={() => { window.location.href = '/signup'; }}
              className="text-[#23A6F0] font-bold hover:underline focus:outline-none"
            >
              Sign up
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}