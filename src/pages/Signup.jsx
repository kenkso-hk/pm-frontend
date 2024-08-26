import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import Api from '../utils/api';
import { requestSuccess, validEmail } from '../utils/Utils';
import useLoading from '../hooks/useLoading';

import PMLogo from "../images/pm.png"

function Signup() {
  const {startLoading, stopLoading} = useLoading();
  const [state, setState] = useState({
    register: {
      name: "",
      contact_person: "",
      phone: "",
      fax: "",
      email: "",
      password: "",
    }
  });

  const handleChange = async (e) => {
    var { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      register: {
        ...prevState.register,
        [id]: value,
      }

    }));

    console.log(state);

  };

  const validarRegistro = async () => {
    
    if (!validEmail(state.register.email)) {
      await swal.fire("¡Ups!", 'Please insert a valid email', "error");
      return false;
    }
    if (state.register.password.length < 8) {
      await swal.fire("¡Ups!", 'Your password must have at least 8 characters', "error");
      return false;
    }
    if (state.register.password !== state.register.password) {
      await swal.fire("¡Ups!", 'The passwords are not equals', "error");
      return false;
    }
    if (state.register.name.length < 3) {
      await swal.fire("¡Ups!", 'Your name must have at least 3 characters', "error");
      return false;
    }
    if (state.register.contact_person.length < 3) {
      await swal.fire("¡Ups!", 'Your contact person must have at least 3 characters', "error");
      return false;
    }
    /*if (!state.register.captchaToken) {
      await swal.fire("¡Ups!", 'Es necesario que marques la casilla "No soy un robot"', "error");
      return false;
    }*/
    return true;
  }

  const registerClick = async (e) => {
    if (e) e.preventDefault();
    if (!await validarRegistro()) return;
    try {
      startLoading();
      console.log(state.register);
      var res = await Api.landlord.create(state.register);
      console.log(res);
      var data = await res.json();
      if (!await requestSuccess(res)) {
        console.log(data.msg);
        stopLoading();
        await swal.fire("Ups!", "Error creating user", "error");
        return;
      }
      stopLoading();
      const { value: ConfirmationCode } = await swal.fire({
        title: 'Email sended',
        icon: 'success',
        input: 'text',
        inputLabel: 'Verification code',
        inputPlaceholder: 'Verification code',
        html: "We have sent an email to " +
        state.register.email +
          ", please insert the verification code."
      });

      if (!ConfirmationCode) {
        return;
      }

      startLoading();

      res = await Api.auth.verifyEmail({
        email: state.register.email,
        ConfirmationCode
      });

      data = await res.json();
      if (requestSuccess(res)) {
        stopLoading();
        await swal.fire("OK!", "Your email has been verified, you can now log in", "success");
        window.location.href = "/";
      } else {
        stopLoading();
        await swal.fire("Ups!", "Error verifying email." + data.msg, "error");
        
        return;
      }

    } catch (e) {
      console.log(e);
      stopLoading();
      await swal.fire("Ups!", "Error al registrar nuevo usuario", "error");
      
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
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Create your Account</h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address <span className="text-rose-500">*</span></label>
                    <input id="email" className="form-input w-full" type="email" onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="fax">Fax <span className="text-rose-500"></span></label>
                    <input id="fax" className="form-input w-full" type="text" onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone <span className="text-rose-500"></span></label>
                    <input id="phone" className="form-input w-full" type="text" onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Name <span className="text-rose-500">*</span></label>
                    <input id="name" className="form-input w-full" type="text" onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="contact_person">Contact person <span className="text-rose-500">*</span></label>
                    <input id="contact_person" className="form-input w-full" type="text" onChange={handleChange} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input id="password" className="form-input w-full" type="password" autoComplete="on" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-sm ml-2">Email me about product news.</span>
                    </label>
                  </div>
                  <Link className="btn bg-[#008080] hover:bg-slate-600 text-white ml-3 whitespace-nowrap" to="/" onClick={registerClick} style={{backgroundColor: "gray"}}>Sign Up</Link>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm">
                  Have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" to="/">Sign In</Link>
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

export default Signup;