import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import Api from '../utils/api';
import { requestSuccess, validEmail } from '../utils/Utils';
import useLoading from '../hooks/useLoading';

import AuthImage from '../images/auth-image.jpg';
import AuthDecoration from '../images/auth-decoration.png';
import PMLogo from "../images/pm.png";
import EmailInput from '../components/inputs/EmailInput';

function Signin() {
  const { startLoading, stopLoading } = useLoading();
  const [state, setState] = useState({
    auth: {
      email: "",
      password: "",
    }
  });

  const handleChange = async (e) => {
    var { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      auth: {
        ...prevState.auth,
        [id]: value,
      }

    }));

  };

  const validarRegistro = async () => {
    if (!validEmail(state.auth.email)) {
      await swal.fire("¡Ups!", 'Please enter a valid email', "error");
      return false;
    }
    if (state.auth.password.length < 0) {
      await swal.fire("¡Ups!", 'Please enter a password', "error");
      return false;
    }
    /*if (!state.auth.captchaToken) {
        await swal.fire("¡Ups!", 'Es necesario que marques la casilla "No soy un robot"', "error");
        return false;
    }*/
    return true;
  }

  const loginClick = async (e) => {
    if (e) e.preventDefault();
    try {
      if (!await validarRegistro()) return;
      startLoading();
      var res = await Api.auth.login(
        state.auth
      );
      console.log(res);
      var data = await res.json();
      console.log(data);
      stopLoading();
      if (await requestSuccess(res)) {
        localStorage.setItem("JWT", data.jwtToken);
        //Util.getValidJWTInfo(setStateApp);
        if (data.user_type === "Renter")
          window.location.href = "/my-applications";
        else
          window.location.href = "/landlord-dashboard";
        return;
      } else {
        if (res.status !== 403) {
          await swal.fire("¡Ups!", data.message, "error");
          return;
        }
      }

    } catch (e) {
      stopLoading();
      await swal.fire("¡Ups!", "Login error", "error");
    }

    try {
      const { value: ConfirmationCode } = await swal.fire({
        title: 'Email sended',
        icon: 'success',
        input: 'text',
        inputLabel: 'Verification code',
        inputPlaceholder: 'Verification code',
        html: "We send an email to " +
          state.auth.email +
          ", please insert your verification code."
      });

      if (!ConfirmationCode) {
        return;
      }
      startLoading();
      res = await Api.auth.verifyEmail({
        email: state.auth.email,
        ConfirmationCode
      });

      data = await res.json();
      stopLoading();
      if (await requestSuccess(res)) {
        await swal.fire("Listo!", "Your email was verified, you can now log in.", "success");
      } else {
        await swal.fire("Ups!", "Error verifying email." + data.error, "error");
        
        return;
      }
    } catch (e) {
      console.log(e);
      stopLoading();
      await swal.fire("¡Ups!", "Error verifying your email", "error");
    }
    stopLoading();
  };


  return (
    <main className="bg-white dark:bg-slate-900">

      <div className="row">

        {/* Content */}
        <div className="col-md-6 col-sm-12">
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
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Welcome back!</h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
                    <input id="email" className="form-input w-full" type="email" onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input id="password" className="form-input w-full" type="password" autoComplete="on" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link className="text-sm underline hover:no-underline" to="/reset-password">Forgot Password?</Link>
                  </div>
                  <Link className="btn bg-[#008080] hover:bg-indigo-600 text-white ml-3" to="/" onClick={loginClick} style={{ backgroundColor: "gray" }}>Sign In</Link>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm">
                  Don’t you have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" to="/renter-signup">Renter Sign Up</Link>
                </div>
                <div className="text-sm">
                  <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" to="/landlord-signup">Landlord Sign Up</Link>
                </div>
                {/* Warning */}
                <div className="mt-5">
                  <div className="bg-amber-100 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400 px-3 py-2 rounded">
                    <svg className="inline w-3 h-3 shrink-0 fill-current mr-2" viewBox="0 0 12 12">
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <span className="text-sm">
                      To support you during the pandemic super pro features are free until March 31st.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Image */}
        <div className="col-md-6 col-sm-12" style={{ alignItems: "center", display: "flex" }}>
          <img src={PMLogo} style={{ width: "100%", height: "auto" }} alt="MDNLogo" />
        </div>

      </div>

    </main>
  );
}

export default Signin;