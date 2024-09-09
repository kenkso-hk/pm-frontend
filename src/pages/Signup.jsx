import React, { useState } from 'react';
import { motion } from "framer-motion";
import { FiArrowUpRight, FiStar } from "react-icons/fi";
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import Api from '../utils/api';
import { requestSuccess, validEmail } from '../utils/Utils';
import useLoading from '../hooks/useLoading';
import PMLogo from "../images/pm.png";
import Present from "../images/auth-image.jpg";
import User1 from "../images/user-32-06.jpg"
import User2 from "../images/user-64-07.jpg"
import User3 from "../images/user-64-14.jpg"
import User4 from "../images/user-64-09.jpg"
import User5 from "../images/user-40-08.jpg"



const Signup = () => {
  const { startLoading, stopLoading } = useLoading();
  const [state, setState] = useState({
    register: {
      name: "",
      contact_person: "",
      phone: "",
      fax: "",
      email: "",
      password: "",
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      register: {
        ...prevState.register,
        [id]: value,
      },
    }));
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
      await swal.fire("¡Ups!", 'The passwords are not equal', "error");
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
    return true;
  };

  const registerClick = async (e) => {
    e.preventDefault();
    if (!await validarRegistro()) return;
    try {
      startLoading();
      const res = await Api.landlord.create(state.register);
      const data = await res.json();
      if (!await requestSuccess(res)) {
        stopLoading();
        await swal.fire("Ups!", "Error creating user", "error");
        return;
      }
      stopLoading();
      const { value: ConfirmationCode } = await swal.fire({
        title: 'Email sent',
        icon: 'success',
        input: 'text',
        inputLabel: 'Verification code',
        inputPlaceholder: 'Verification code',
        html: `We have sent an email to ${state.register.email}, please insert the verification code.`,
      });

      if (!ConfirmationCode) return;

      startLoading();
      const resVerify = await Api.auth.verifyEmail({
        email: state.register.email,
        ConfirmationCode,
      });

      const dataVerify = await resVerify.json();
      if (requestSuccess(resVerify)) {
        stopLoading();
        await swal.fire("OK!", "Your email has been verified, you can now log in", "success");
        window.location.href = "/";
      } else {
        stopLoading();
        await swal.fire("Ups!", `Error verifying email: ${dataVerify.msg}`, "error");
      }
    } catch (error) {
      stopLoading();
      await swal.fire("Ups!", "Error registering new user", "error");
    }
    stopLoading();
  };

  return (
    <section className="grid min-h-screen grid-cols-1 bg-slate-50 md:grid-cols-[1fr,_400px] lg:grid-cols-[1fr,_600px]">
      {/* <Logo /> */}
      <Form handleChange={handleChange} registerClick={registerClick} />
      <SupplementalContent />
    </section>
  );
};

const Form = ({ handleChange, registerClick }) => {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      viewport={{ once: true }}
      className="flex items-start justify-start pb-4 pt-20 md:py-20"
    >
      <div className="mx-auto my-auto max-w-lg px-4 md:pr-0">
        <motion.h1
          variants={primaryVariants}
          className="mb-2 text-start text-4xl font-semibold"
        >
          Create your account
        </motion.h1>

        <motion.p variants={primaryVariants} className="mb-8 text-start">
          Please fill out the information below
        </motion.p>

        <form onSubmit={registerClick} className="w-full">
          {/* Name */}
          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="name"
              className="mb-1 inline-block text-sm font-medium"
            >
              Name<span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>

          {/* Contact Person */}
          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="contact_person"
              className="mb-1 inline-block text-sm font-medium"
            >
              Contact Person<span className="text-red-600">*</span>
            </label>
            <input
              id="contact_person"
              type="text"
              placeholder="Enter contact person"
              onChange={handleChange}
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>

          {/* Phone */}
          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="phone"
              className="mb-1 inline-block text-sm font-medium"
            >
              Phone<span className="text-red-600">*</span>
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Enter phone number"
              onChange={handleChange}
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>

          {/* Fax */}
          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="fax"
              className="mb-1 inline-block text-sm font-medium"
            >
              Fax
            </label>
            <input
              id="fax"
              type="text"
              placeholder="Enter fax number"
              onChange={handleChange}
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="email"
              className="mb-1 inline-block text-sm font-medium"
            >
              Email<span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="password"
              className="mb-1 inline-block text-sm font-medium"
            >
              Password<span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>

          {/* Terms and Conditions */}
          <motion.div
            variants={primaryVariants}
            className="mb-4 flex w-full items-start gap-1.5 mt-5"
          >
            <input
              type="checkbox"
              id="terms-checkbox"
              className="h-4 w-4 accent-indigo-600"
              required
            />
            <label htmlFor="terms-checkbox" className="text-xs">
              By signing up, I agree to the terms and conditions, privacy policy, and cookie policy
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={primaryVariants}
            whileTap={{
              scale: 0.985,
            }}
            type="submit"
            className="mb-1.5 w-full rounded bg-indigo-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Sign up
          </motion.button>

          <motion.p variants={primaryVariants} className="text-xs mt-4">
            Already have an account?{" "}
            <Link className="text-indigo-600 underline" to="/">
              Sign in
            </Link>
          </motion.p>
        </form>
      </div>
    </motion.div>
  );
};

const SupplementalContent = () => {
  return (
    <div className="group sticky top-4 m-4 h-80 overflow-hidden rounded-3xl rounded-tl-[4rem] bg-slate-950 md:h-[calc(100vh_-_2rem)]">
      <img
        alt="An example image"
        src={Present}
        className="h-full w-full bg-white object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-50"
      />

      <div className="absolute right-2 top-4 z-10">
        <FiArrowUpRight className="rotate-45 text-6xl text-indigo-200 opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100" />
      </div>

      <motion.div
        initial="initial"
        whileInView="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        viewport={{ once: true }}
        className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-slate-950/90 to-slate-950/0 p-8"
      >
        <motion.h2
          className="mb-2 text-3xl font-semibold leading-[1.25] text-white lg:text-4xl"
          variants={primaryVariants}
        >
          Unlock Effortless 
          <br />
          Property Management
        </motion.h2>
        <motion.p
          variants={primaryVariants}
          className="mb-6 max-w-md text-sm text-slate-300"
        >
          Create your account and gain access to comprehensive property management tools. From tenant relations to maintenance, everything is at your fingertips.
        </motion.p>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <motion.img
              variants={avatarVariants}
              className="h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src={User4}
            />
            <motion.img
              variants={avatarVariants}
              className="-ml-4 h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src={User1}
            />
            <motion.img
              variants={avatarVariants}
              className="-ml-4 h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src={User3}
            />
            <motion.img
              variants={avatarVariants}
              className="-ml-4 h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src={User2}
            />
            <motion.img
              variants={avatarVariants}
              className="-ml-4 h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src={User5}
            />
          </div>
          <div>
            <motion.div variants={primaryVariants} className="flex gap-0.5">
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <span className="ml-2 text-sm text-white">5.0</span>
            </motion.div>
            <motion.p
              variants={primaryVariants}
              className="text-xs text-slate-300"
            >
              from over 100,000 reviews
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Logo = () => {
  return (
    <svg
      width="50"
      height="39"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[50%] top-4 -translate-x-[50%] fill-slate-950 md:left-4 md:-translate-x-0"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="#000000"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#000000"
      ></path>
    </svg>
  );
};

const primaryVariants = {
  initial: {
    y: 25,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const avatarVariants = {
  initial: {
    x: 10,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};

export default Signup;
