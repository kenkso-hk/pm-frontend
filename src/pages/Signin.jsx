import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import Api from '../utils/api';
import { requestSuccess, validEmail } from '../utils/Utils';
import useLoading from '../hooks/useLoading';
import { twMerge } from "tailwind-merge";
import PMLogo from "../images/pm.png";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import Iasign from "../images/Iasign.png"

export default function Signin ()  {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <section className="grid min-h-screen grid-cols-1 bg-slate-50 md:grid-cols-[1fr,_400px] lg:grid-cols-[1fr,_600px]">
      {/* Si tienes un componente Logo, puedes descomentar esta línea */}
      {/* <Logo /> */}
      
      {/* Formulario de inicio de sesión */}
      <Form isLogin={isLogin} setIsLogin={setIsLogin} />
      
      
      {/* Contenido adicional, como imágenes o enlaces */}
      <SupplementalContent />

      {/* Mensaje de advertencia */}
     
    </section>
  );
};

const Heading = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();
  return(
  <div>
    <Logo />
    <motion.div variants={primaryVariants} className="mb-9 mt-6 space-y-1.5">
      <h1 className="text-2xl font-semibold">
        {isLogin ? "Sign in to your account" : "Create your account"}
      </h1>
     
      <p className="text-zinc-400">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        
      </p>
    </motion.div>
  </div>
  )
  }


  const Or = () => {
    return (
      <div className="my-6 flex items-center gap-3">
        <div className="h-[1px] w-full bg-zinc-300" />
        <span className="text-zinc-400">OR</span>
        <div className="h-[1px] w-full bg-zinc-300" />
      </div>
    );
  };

const Form = ({ isLogin, setIsLogin }) => {
  const { startLoading, stopLoading } = useLoading();
  const [state, setState] = useState({
    auth: {
      email: "",
      password: "",
    }
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      auth: {
        ...prevState.auth,
        [id]: value,
      },
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
    return true;
  };

  const loginClick = async (e) => {
    e.preventDefault();
    try {
      if (!await validarRegistro()) return;
      startLoading();
      const res = await Api.auth.login(state.auth);
      const data = await res.json();
      stopLoading();
      if (await requestSuccess(res)) {
        localStorage.setItem("JWT", data.jwtToken);
        localStorage.setItem("user", JSON.stringify({
          ...data.user,
          user_type: data.user_type,
        }));
        window.location.href = data.user_type === "Renter" ? "/my-applications" : "/landlord-dashboard";

      } else {
        await swal.fire("¡Ups!", data.message, "error");
      }
    } catch (e) {
      stopLoading();
      await swal.fire("¡Ups!", "Login error", "error");
    }
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{ staggerChildren: 0.05 }}
      viewport={{ once: true }}
      className="flex items-center justify-center pb-4 pt-20 md:py-20"
    >
      <div className="mx-auto my-auto max-w-lg px-4 md:pr-0">
        <Heading isLogin={isLogin} setIsLogin={setIsLogin} />
        <SocialOptions />
        <Or/>
        <form onSubmit={loginClick} className="w-full">
          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label htmlFor="email" className="mb-1 inline-block text-sm font-medium">
              Email<span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={state.auth.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-12 text-lg rounded border-[1px] border-slate-300 px-3 py-2.5 focus:outline-indigo-600"
              required
            />
          </motion.div>

          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label htmlFor="password" className="mb-1 inline-block text-sm font-medium">
              Password<span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={state.auth.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full h-12 text-lg rounded border-[1px] border-slate-300 px-3 py-2.5 focus:outline-indigo-600"
              required
            />
          </motion.div>

          <SplashButton
            vtype="submit" className="w-full">
            {isLogin ? "Sign in" : "Create account"}
          </SplashButton>
         <Terms />
        </form>

        <motion.div variants={primaryVariants} className="flex gap-0.5">
        <div className="bg-amber-100 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400 px-3 py-2 rounded">
          <svg className="inline w-3 h-3 shrink-0 fill-current mr-2" viewBox="0 0 12 12">
            <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
          </svg>
          <span className="text-sm">
            To support you during the pandemic, super pro features are free until March 31st.
          </span>
        </div>
      </motion.div>


        
      </div>
    </motion.div>
  );
};

const BubbleButton = ({ children, className, ...rest }) => {
  return (
    <button
      className={twMerge(
        `
        relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-md 
        border border-indigo-600 bg-white
        px-3 py-1.5
        text-ellipsis transition-all duration-300
        
        before:absolute before:inset-0
        before:-z-10 before:translate-y-[200%]
        before:scale-[2.5]
        before:rounded-[100%] before:bg-black
        before:transition-transform before:duration-500
        before:content-[""]

        hover:scale-105 hover:text-white
        hover:before:translate-y-[0%] hover:before:bg-black
        active:scale-100`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};



const Terms = () => (
  <p className="mt-9 text-xs text-zinc-400">
    By signing in, you agree to our{" "}
    <a href="#" className="text-blue-400">Terms & Conditions</a> and{" "}
    <a href="#" className="text-blue-400">Privacy Policy.</a>
  </p>
);

const SocialOptions = () => {
  const navigate = useNavigate();
  return(
    <motion.div variants={primaryVariants} >
    <div className="mb-3 flex gap-3">
     
      <BubbleButton className="flex w-full justify-center py-3" onClick={() => navigate('/renter-signup')}>
      <FaHouseChimneyUser /> Landlord Sign Up
      </BubbleButton>
      <BubbleButton className="flex w-full justify-center py-3" onClick={() => navigate('/landlord-signup')}>
      <FaCircleUser /> Create One 
      </BubbleButton>
    </div>
    
  </motion.div>
  )
}

const SplashButton = ({ children, className, ...rest }) => {
  return (
    <motion.button
      className={twMerge(
        "rounded-md bg-gradient-to-br  bg-indigo-600 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2  transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 mt-10",
        className
      )}
   
      {...rest}
    >
      {children}
    </motion.button>
  );
};





const SupplementalContent = () => {
  return (
    <div className="group sticky top-4 m-4 h-80 overflow-hidden rounded-3xl rounded-tl-[4rem] bg-slate-950 md:h-[calc(100vh_-_2rem)]">
      <img
        alt="An example image"
        src={Iasign}
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
          Professional Management, 
          <br />
          Maximum Results
        </motion.h2>
        <motion.p
          variants={primaryVariants}
          className="mb-6 max-w-md text-sm text-slate-300"
        >
          Our dedicated property management team is here to enhance the value of your property, ensuring top-tier service for both you and your tenants.
        </motion.p>
     
      </motion.div>
    </div>
  );
};



const Logo = () => {
  return (
    <div
      className="col-md-6 col-sm-10"
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: "white",
        padding: "20px", // puedes ajustar el padding si lo deseas
        borderRadius: "10px", // le da bordes redondeados
      }}
    >
      <img
        src={PMLogo}
        style={{ width: "50%", height: "auto" }} // ajusta el tamaño de la imagen
        alt="MDNLogo"
      />
    </div>
  );
};


const primaryVariants = {
  initial: { y: 25, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};
