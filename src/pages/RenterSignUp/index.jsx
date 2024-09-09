import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import GeneralInformation from "../ApplicationForm/GeneralInformation";
import MinorsToOccupy from "../ApplicationForm/MinorsToOccupy";
import ApplicantIncomes from "../ApplicationForm/ApplicantIncomes";
import ResidenceHistory from "../ApplicationForm/RentalHistory";
import AnimalsInformation from "../ApplicationForm/AnimalsInformation";
import EmergencyContact from "../ApplicationForm/EmergencyContact";
import Vehicles from "../ApplicationForm/Vehicles";
import CriminalRecord from "../ApplicationForm/CriminalRecord";
import useLoading from "../../hooks/useLoading";
import swal from "sweetalert2";
import Api from "../../utils/api";
import useMeasure from "react-use-measure";
import { GoScreenFull } from "react-icons/go";
import { BiExitFullscreen } from "react-icons/bi";
import { FaChevronLeft } from "react-icons/fa";

import { useDragControls, useMotionValue, useAnimate } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ApplicationAndOffer() {
  return (
    <div className="bg-white">
      <TextParallaxContent
        subheading="Welcome to our platform"
        heading="Manage your rentals with ease!"
        imgUrl="https://media.istockphoto.com/id/1267720880/photo/lovely-mornings.jpg?s=612x612&w=0&k=20&c=S8hOyeNyZ24ArjpzmUVEb1eQHfiMi2Z1xhWA5JTT47E="
      >
        <ExampleContent />
        <SteppedProgress />
      </TextParallaxContent>
    </div>
  );
}

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
        {/* <BackButton />  */}
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
      initial={{ opacity: 0, y: 50 }} // Empieza transparente y ligeramente desplazada
      animate={{ opacity: 1, y: 0 }} // Aparece completamente visible y en su posición final
      transition={{ duration: 1, ease: "easeInOut" }} // Ajusta la duración y suavidad de la transición
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{ opacity }}
      />
    </motion.div>
  );
};

const BackButton = () => {
  const navigate = useNavigate(); // Inicializa el hook

  // Función para regresar a la página anterior
  const goBack = () => {
    navigate(-1); // Esto realiza el go back
  };

  return (
    <button
      type="button"
      className="group absolute top-10 left-4 z-20 flex items-center gap-2 rounded-full bg-neutral-200 pl-3 pr-4 transition-all duration-300 ease-in-out hover:bg-black hover:pl-2 hover:text-white active:bg-neutral-700"
      onClick={goBack}
    >
      <span className="rounded-full bg-black p-1 text-sm transition-colors duration-300 group-hover:bg-white">
        <FaChevronLeft className="translate-x-[200%] text-[0px] transition-all duration-300 group-hover:translate-x-0 group-hover:text-lg group-hover:text-black group-active:-rotate-45" />
      </span>
      <span>Go Back</span>
    </button>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Get Ready to List Your Property
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        Please fill out the forms and registration tables with all the required
        details to successfully add your rental property. This will help
        potential tenants find and connect with you easily.
      </p>
    </div>
  </div>
);

const SteppedProgress = () => {
  const [stepsComplete, setStepsComplete] = useState(0);
  const numSteps = 5;
  const methods = useForm();
  const { startLoading, stopLoading } = useLoading();
  const stepFields = {
    0: ["generalInformationField1", "generalInformationField2"],
    1: [
      "minorsToOccupyField1",
      "minorsToOccupyField2",
      "applicantIncomesField1",
      "applicantIncomesField2",
    ],
    2: [
      "residenceHistoryField1",
      "residenceHistoryField2",
      "animalsInformationField1",
      "animalsInformationField2",
    ],
    3: [
      "emergencyContactField1",
      "emergencyContactField2",
      "vehiclesField1",
      "vehiclesField2",
    ],
  };

  const [isModalOpen, setModalOpen] = useState(false); // Estado para el modal
  const containerRef = useRef(null);

  // Función para entrar en modo pantalla completa
  const enterFullScreen = () => {
    if (containerRef.current) {
      containerRef.current.requestFullscreen();
    }
  };

  // Función para salir del modo pantalla completa
  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true); // Actualiza estado
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false); // Actualiza estado
      }
    }
  };
  const handleSetStep = (num) => {
    if (
      (stepsComplete === 0 && num === -1) ||
      (stepsComplete === numSteps - 1 && num === 1)
    ) {
      return;
    }
    setStepsComplete((prev) => prev + num);
  };

  const formRef = useRef(null); 

  const validateStep = async () => {
    const fieldsToValidate = stepFields[stepsComplete];
    
    let valid = true;
    let generalInfoValid = true;
  
    // Solo validar `GeneralInformation` cuando el paso sea 0 (o el paso donde uses `GeneralInformation`)
    if (stepsComplete === 0) {
      generalInfoValid = formRef.current ? await formRef.current.validateForm() : true;
    }
  
    // Validar campos para todos los pasos excepto el de `GeneralInformation`
    if (stepsComplete !== 0) {
      valid = await methods.trigger(fieldsToValidate);
    }
  
    console.log('Validating step:', stepsComplete);
    console.log('Field validation:', valid);
    console.log('General form validation:', generalInfoValid);
  
    if ((!valid && stepsComplete !== 0) || (stepsComplete === 0 && !generalInfoValid)) {
      console.log("Validation failed for current step or general information form");
    } else {
      if (stepsComplete === 3) {
        setModalOpen(true);
      } else {
        handleSetStep(1);
      }
    }
  };
  



  const submitApplication = async (data) => {
    try {
      startLoading();
      const res = await Api.users.create(data);
      const result = await res.json();
      stopLoading();
      if (res.ok) {
        await swal.fire(
          "Success",
          "Application submitted successfully",
          "success"
        );
      } else {
        await swal.fire(
          "Error",
          result.message || "An error occurred",
          "error"
        );
      }
    } catch (error) {
      stopLoading();
      swal.fire("Error", "Failed to submit application", "error");
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitApplication)}>
          <div className="relative w-full h-screen">
            <div className="p-8 bg-white shadow-lg w-full h-full rounded-lg">
              <Steps numSteps={numSteps} stepsComplete={stepsComplete} />
              <div className="my-6 bg-gray-100 border-dashed border-gray-200 rounded-lg w-full h-[80vh] overflow-y-auto">
                <FormStep stepsComplete={stepsComplete} formRef={formRef} />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex justify-start">
                  <button
                    type="button"
                    className="flex justify-center items-center 
      w-[100px] sm:w-[100px] md:w-[100px] lg:w-[200px]
      h-[50px] 
      rounded-lg 
      bg-gray-300 
      text-black 
      text-xl
      font-semibold
      hover:bg-gray-400
      focus:outline-none 
      focus:ring-2 
      focus:ring-offset-2 
      focus:ring-gray-400 
      transition-all 
      duration-300 
      ease-in-out"
                    onClick={toggleFullScreen}
                  >
                    {isFullScreen ? <BiExitFullscreen /> : <GoScreenFull />}
                  </button>
                </div>

                {/* Contenedor de los botones de navegación a la derecha */}
                <div className="flex items-center gap-2">
                  {/* Botón Prev */}

                
                  {stepsComplete === 1 && (
  <button
    type="button"
    className="
      w-[100px] sm:w-[150px] md:w-[200px] lg:w-[200px] 
      h-[40px] sm:h-[50px] md:h-[60px] 
      rounded-lg 
      bg-gray-300 
      text-black 
      text-sm sm:text-lg md:text-xl 
      font-semibold 
      hover:bg-gray-400
      focus:outline-none 
      focus:ring-2 
      focus:ring-offset-2 
      focus:ring-gray-400 
      transition-all 
      duration-300 
      ease-in-out 
      flex 
      justify-center 
      items-center" 
    onClick={() => handleSetStep(-1)}
  >
    <FaChevronLeft />
  </button>
)}

                  {/* Botón Next o Submit */}
                 {stepsComplete < numSteps - 1 ? (
        <button
          type="button"
          className="
            w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px] 
            h-[40px] sm:h-[50px] md:h-[60px] 
            rounded-lg 
            bg-indigo-500 
            text-white 
            text-sm sm:text-lg md:text-xl 
            font-semibold 
            hover:bg-indigo-600
            focus:outline-none 
            focus:ring-2 
            focus:ring-offset-2 
            focus:ring-indigo-400 
            transition-all 
            duration-300 
            ease-in-out"
          onClick={validateStep} // Aquí llamas a validateStep
        >
          Next
        </button>
      ) : (
                    <button
                      type="submit"
                      className="px-4 py-1 rounded bg-black text-white"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>

      {/* Modal para el paso 3 */}
      <DragCloseDrawer open={isModalOpen} setOpen={setModalOpen}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitApplication)}>
            <div className="p-1 shadow-lg w-full h-full rounded-lg mt-3">
              {/* Botón Prev arriba de CriminalRecord */}
              <div className="flex justify-end p-4">
                <p className="text-sm font-semibold text-gray-300">
                  To close this modal, click outside of it or drag it down.
                </p>
              </div>

              {/* Componente CriminalRecord */}
              <CriminalRecord />

              {/* Botón Submit abajo */}
              <div className="flex justify-center mt-10">
                <button
                  type="submit"
                  className="
      w-[50vw] py-3 
      rounded-lg 
      bg-blue-700
      text-white
      font-semibold 
      shadow-lg 
      hover:bg-gray-800 
      hover:shadow-xl 
      focus:outline-none 
      focus:ring-2 
      focus:ring-offset-2 
      focus:ring-gray-700 
      transition-all 
      duration-300 
      ease-in-out 
      transform hover:-translate-y-1 active:scale-95
    "
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </DragCloseDrawer>
    </div>
  );
};

const DragCloseDrawer = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-neutral-900"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-4">
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
              ></button>
            </div>
            <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

const Steps = ({ numSteps, stepsComplete }) => {
  const stepArray = Array.from(Array(numSteps).keys());

  return (
    <div className="flex items-center justify-between gap-3">
      {stepArray.map((num) => {
        const stepNum = num + 1;
        const isActive = stepNum <= stepsComplete;
        return (
          <React.Fragment key={stepNum}>
            <Step num={stepNum} isActive={isActive} />
            {stepNum !== stepArray.length && (
              <div className="w-full h-1 rounded-full bg-gray-200 relative">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-indigo-600 rounded-full"
                  animate={{ width: isActive ? "100%" : 0 }}
                  transition={{ ease: "easeIn", duration: 0.3 }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Step = ({ num, isActive }) => {
  return (
    <div className="relative">
      <div
        className={`w-10 h-10 flex items-center justify-center shrink-0 border-2 rounded-full font-semibold text-sm relative z-10 transition-colors duration-300 ${
          isActive
            ? "border-indigo-600 bg-indigo-600 text-white"
            : "border-gray-300 text-gray-300"
        }`}
      >
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.svg
              key="icon-marker-check"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1.6em"
              width="1.6em"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.125 }}
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
            </motion.svg>
          ) : (
            <motion.span
              key="icon-marker-num"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.125 }}
            >
              {num}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {isActive && (
        <div className="absolute z-0 -inset-1.5 bg-indigo-100 rounded-full animate-pulse" />
      )}
    </div>
  );
};

const FormStep = ({ stepsComplete, formRef }) => {
  switch (stepsComplete) {
    case 0:
      return  <GeneralInformation ref={formRef} />
    case 1:
      return (
        <>
          <MinorsToOccupy />
          <ApplicantIncomes />
        </>
      );
    case 2:
      return (
        <>
          <ResidenceHistory />
          <AnimalsInformation />
        </>
      );
    case 3:
      return (
        <>
          <Vehicles />
          <EmergencyContact />
        </>
      );
    case 4:
      return <CriminalRecord />;
    default:
      return null;
  }
};

