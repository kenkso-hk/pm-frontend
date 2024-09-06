import React, { useState } from 'react';
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import swal from 'sweetalert2';
import Api from '../utils/api';
import useLoading from '../hooks/useLoading';
import { requestSuccess, validEmail } from '../utils/Utils';
import PMLogo from "../images/pm.png";
import { useNavigate, Link } from 'react-router-dom';

const Signin = () => {
  const { startLoading, stopLoading } = useLoading();
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    contact_person: "",
    phone: "",
    fax: ""
  });
  const [isLogin, setIsLogin] = useState(true); // Alternar entre login y registro

  const handleChange = ({ target: { id, value } }) => {
    setState(prevState => ({ ...prevState, [id]: value }));
  };

  const validarRegistro = async () => {
    if (!validEmail(state.email)) {
      await swal.fire("¡Ups!", 'Please enter a valid email', "error");
      return false;
    }
    if (state.password.length < 6) {
      await swal.fire("¡Ups!", 'Please enter a password', "error");
      return false;
    }
    return true;
  };

  const loginClick = async (e) => {
    e.preventDefault();
    if (!await validarRegistro()) return;
    try {
      startLoading();
      const res = await Api.auth.login(state);
      const data = await res.json();
      stopLoading();
      if (await requestSuccess(res)) {
        localStorage.setItem("JWT", data.jwtToken);
        localStorage.setItem("user", JSON.stringify({
          ...data.user,
          user_type: data.user_type
        }));
        window.location.href = data.user_type === "Renter" ? "/my-applications" : "/landlord-dashboard";
      } else if (res.status !== 403) {
        await swal.fire("¡Ups!", data.message, "error");
      }
    } catch (error) {
      stopLoading();
      await swal.fire("¡Ups!", "Login error", "error");
    }
  };

  const registerClick = async (e) => {
    e.preventDefault();
    if (!await validarRegistro()) return;
    try {
      startLoading();
      const res = await Api.landlord.create(state);
      const data = await res.json();
      stopLoading();

      if (!await requestSuccess(res)) {
        await swal.fire("Ups!", "Error creating user", "error");
        return;
      }

      const { value: ConfirmationCode } = await swal.fire({
        title: 'Email sent',
        icon: 'success',
        input: 'text',
        inputLabel: 'Verification code',
        inputPlaceholder: 'Verification code',
        html: `We have sent an email to ${state.email}, please insert the verification code.`
      });

      if (!ConfirmationCode) return;

      startLoading();
      const verifyRes = await Api.auth.verifyEmail({ email: state.email, ConfirmationCode });
      const verifyData = await verifyRes.json();
      stopLoading();

      if (await requestSuccess(verifyRes)) {
        await swal.fire("Listo!", "Your email was verified, you can now log in.", "success");
      } else {
        await swal.fire("Ups!", `Error verifying email. ${verifyData.error}`, "error");
      }
    } catch (error) {
      stopLoading();
      await swal.fire("¡Ups!", "Error registering", "error");
    }
  };

  return (
    <div className="bg-zinc-950 text-zinc-200 selection:bg-zinc-600 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="relative z-10 mx-auto w-full max-w-xl p-4"
      >
        <Heading isLogin={isLogin} setIsLogin={setIsLogin} />
        <SocialOptions />
        <Or />
        <form onSubmit={isLogin ? loginClick : registerClick}>
          {!isLogin && <InputFields state={state} handleChange={handleChange} />}
          <InputField id="email" type="email" placeholder="your.email@provider.com" value={state.email} onChange={handleChange} />
          <InputField id="password" type="password" placeholder="••••••••••••" value={state.password} onChange={handleChange} />
          {
            isLogin && (
              <div className="mr-1 mt-2 text-right">
            <Link className="text-sm underline text-blue-500 hover:text-blue-400 transition-colors duration-200 ease-in-out" to="/reset-password">
              Forgot Password?
            </Link>
          </div>

            )


          }
          
          <SplashButton type="submit" className="w-full mt-4">
            {isLogin ? "Sign in" : "Sign up"}
          </SplashButton>
        </form>
        <Terms />
      </motion.div>
    </div>
  );
};

const Heading = ({ isLogin, setIsLogin }) => (
  <div>
    <NavLogo />
    <div className="mb-9 mt-6 space-y-1.5">
      <h1 className="text-2xl font-semibold">
        {isLogin ? "Sign in to your account" : "Create your account"}
      </h1>
      <p className="text-zinc-400">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-400 cursor-pointer"
        >
          {isLogin ? "Create one." : "Sign in"}
        </span>
      </p>
    </div>
  </div>
);

const InputFields = ({ state, handleChange }) => (
  <>
    <InputField id="name" placeholder="Your Name" value={state.name} onChange={handleChange} />
    <InputField id="contact_person" placeholder="Contact Person" value={state.contact_person} onChange={handleChange} />
    <InputField id="phone" placeholder="Phone Number" value={state.phone} onChange={handleChange} />
  </>
);

const InputField = ({ id, type = "text", placeholder, value, onChange }) => (
  <div className="mb-3">
    <label htmlFor={id} className="mb-1.5 block text-zinc-400">{placeholder}</label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
    />
  </div>
);

const SocialOptions = () => {
  const navigate = useNavigate();
  return (
    <BubbleButton className="flex w-full justify-center py-3" onClick={() => navigate('/renter-signup')}>
      Landlord Sign Up
    </BubbleButton>
  );
};

const Or = () => (
  <div className="my-6 flex items-center gap-3">
    <div className="h-[1px] w-full bg-zinc-700" />
    <span className="text-zinc-400">OR</span>
    <div className="h-[1px] w-full bg-zinc-700" />
  </div>
);

const Terms = () => (
  <p className="mt-9 text-xs text-zinc-400">
    By signing in, you agree to our{" "}
    <a href="#" className="text-blue-400">
      Terms & Conditions
    </a>{" "}
    and{" "}
    <a href="#" className="text-blue-400">
      Privacy Policy.
    </a>
  </p>
);

const SplashButton = ({ children, className, ...rest }) => (
  <button
    className={twMerge(
      "rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70",
      className
    )}
    {...rest}
  >
    {children}
  </button>
);

const BubbleButton = ({ children, className, ...rest }) => (
  <button
    className={twMerge(
      `
      relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-md 
      border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950
      px-3 py-1.5
      text-zinc-50 transition-all duration-300
      
      before:absolute before:inset-0
      before:-z-10 before:translate-y-[200%]
      before:scale-[2.5]
      before:rounded-[100%] before:bg-zinc-100
      before:transition-transform before:duration-500
      before:content-[""]

      hover:scale-105 hover:text-zinc-900
      hover:before:translate-y-[0%]
      active:scale-100`,
      className
    )}
    {...rest}
  >
    {children}
  </button>
);

const NavLogo = () => (
  <div className="col-md-5 col-sm-10 flex items-start justify-start bg-white p-2 rounded-lg">
    <img
      src={PMLogo}
      className="w-auto max-w-[80px] h-auto object-contain bg-white rounded-full p-1"
      alt="MDNLogo"
    />
  </div>
);

export default Signin;
