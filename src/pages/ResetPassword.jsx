import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import Api from '../utils/api';
import { requestSuccess, validEmail } from '../utils/Utils';
import useLoading from '../hooks/useLoading';

import AuthImage from '../images/auth-image.jpg';
import AuthDecoration from '../images/auth-decoration.png';

function ResetPassword() {
  const {startLoading, stopLoading} = useLoading();
  const [state, setState] = useState({
    auth: {
      email: "",
    },
    verificationCodeSended: false
  });

  const handleChange = async (e) => {
    var { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      auth: {
        ...prevState.auth,
        [id]: value,
      },
      
    }));
  };

  const validateData = async () => {
    if (!validEmail(state.auth.email)) {
      await swal.fire("¡Ups!", 'Please enter a valid email', "error");
      return false;
    }
    /*if (!state.auth.captchaToken) {
        await swal.fire("¡Ups!", 'Es necesario que marques la casilla "No soy un robot"', "error");
        return false;
    }*/
    return true;
  }

  const validateDataConfirm = async () => {
    if (state.auth.newPassword.length < 8) {
      await swal.fire("¡Ups!", 'The password must have at least 8 characters', "error");
      return false;
    }

    if (state.auth.newPassword !== state.auth.confirmPassword) {
      await swal.fire("¡Ups!", 'The passwords must match', "error");
      return false;
    }
    /*if (!state.auth.captchaToken) {
        await swal.fire("¡Ups!", 'Es necesario que marques la casilla "No soy un robot"', "error");
        return false;
    }*/
    return true;
  }

  const forgotPasswordRequestClick = async (e) => {
    if (e) e.preventDefault();
    try {
      if (!await validateData()) return;
      startLoading();
      var res = await Api.auth.forgotPassword(
        state.auth
      );

      console.log(res);
      var data = await res.json();
      console.log(data);
      if (await requestSuccess(res)) {
        setState((prevState)=>({
          ...prevState,
          verificationCodeSended: true
        }));
        await swal.fire("Ok!", "We have sended you an email with a confirmation code", "success");
      } else {

      }
    } catch (e) {
      console.log(e);
      await swal.fire("¡Ups!", "Failed to login. You may have problems with your internet connection.", "error");
    }
    //recaptchaRef.current.reset();
    stopLoading();
  };

  const confirmForgotPasswordRequestClick = async (e) => {
    if (e) e.preventDefault();
    try {
      if (!await validateDataConfirm()) return;
      startLoading();
      var res = await Api.auth.confirmForgotPassword(
        state.auth
      );

      console.log(res);
      var data = await res.json();
      console.log(data);
      if (await requestSuccess(res)) {
        await swal.fire("Ok!", "Your password was updated", "success");
        window.location.href = "/";
      } else {

      }
    } catch (e) {
      console.log(e);
      await swal.fire("¡Ups!", "Failed to login. You may have problems with your internet connection.", "error");
    }
    //recaptchaRef.current.reset();
    stopLoading();
  };

  return (
    <main className="bg-white dark:bg-slate-900">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">

            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                        <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                        <stop stopColor="#A5B4FC" offset="100%" />
                      </linearGradient>
                      <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                        <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                        <stop stopColor="#38BDF8" offset="100%" />
                      </linearGradient>
                    </defs>
                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                    <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
                    <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
                    <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Reset your Password ✨</h1>
              {/* Form */}
              <form hidden={state.verificationCodeSended}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address <span className="text-rose-500">*</span></label>
                    <input id="email" className="form-input w-full" type="email" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap" onClick={forgotPasswordRequestClick} style={{backgroundColor: "gray"}}>Send Reset Link</button>
                </div>
              </form>
              <form hidden={!state.verificationCodeSended}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Code <span className="text-rose-500">*</span></label>
                    <input id="code" className="form-input w-full" type="text" onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">New Password <span className="text-rose-500">*</span></label>
                    <input id="newPassword" className="form-input w-full" type="password" onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Confirm new password <span className="text-rose-500">*</span></label>
                    <input id="confirmPassword" className="form-input w-full" type="password" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap" onClick={confirmForgotPasswordRequestClick} style={{backgroundColor: "gray"}}>Update Password</button>
                </div>
              </form>
            </div>

          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
          <img className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />
        </div>

      </div>

    </main>
  );
}

export default ResetPassword;