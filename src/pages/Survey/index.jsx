import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import HeaderForm from "./HeaderForm";
import GeneralInformation from "./GeneralInformation";
import Footer from "./Footer";
import Api from "../../utils/api";
import swal from 'sweetalert2';
import { requestSuccess, validEmail } from '../../utils/Utils';
import useLoading from '../../hooks/useLoading';

import {
  useParams,
} from "react-router-dom";

function VerificationOfRentalHistory() {
  const {startLoading, stopLoading} = useLoading();
  const params = useParams();
  const methods = useForm();
  const { getValues, handleSubmit, formState: { isSubmitSuccessful } } = methods;
  const [disabled, setDisabled] = useState(false);
  const [state, setState] = useState({
    complexes: [{}, {}]
  });

  const submitApplication = async () => {
    
    const data = getValues();
    console.log(data);
    data[data.purpose] = true;
    setDisabled(true);

    await createSurveyClick(data);
  };

  useEffect(() => {
    getComplexesAPI();
    getApplicationAPI();
    getMyLandlordAPI();
  }, []);

  const validateData = async (data) => {
    console.log(data);
    if (new Date(data.birth_date) > new Date()) {
      await swal.fire("Ups!", "Please insert past date for your birthdate", "error");
      return false;
    }
    if (data.password.length < 8) {
      await swal.fire("Ups!", "Your password must have at least 8 characters", "error");
      return false;
    }
    return true;
  }

  const createSurveyClick = async (data) => {
    try {
      //if (!await validateData(data)) return;
      startLoading();
      var res = await Api.survey.create(data);

      console.log(res);
      var data = await res.json();
      console.log(data);
      if (await requestSuccess(res)) {
        await swal.fire("OK!", "Thank you for the information!", "success");
      } else {
        await swal.fire("Ups!", "Error saving your survey", "error");
      }
    } catch (e) {
      console.log(e);
      await swal.fire("¡Ups!", "Failed saving your survey. You may have problems with your internet connection.", "error");
    }
    //recaptchaRef.current.reset();
    stopLoading();
  };


  const getComplexesAPI = async () => {
    try {
      startLoading();
      var res = await Api.complex.list();

      console.log(res);


      if (await requestSuccess(res)) {
        var data = await res.json();
        console.log(data);
        setState((prevState) => ({
          ...prevState,
          complexes: data.complex
        }));

      } else {
        await swal.fire("Ups!", "Error getting complexes", "error");
      }
    } catch (e) {
      console.log(e);
      await swal.fire("Ups!", "Error getting complexes", "error");
    }
    stopLoading();
  };

  const getApplicationAPI = async () => {
    try {
      startLoading();
      var res = await Api.application.get(params.id_application);

      console.log(res);


      if (await requestSuccess(res)) {
        var data = await res.json();
        console.log(data);
        setState((prevState) => ({
          ...prevState,
          application: data.application
        }));

      } else {
        await swal.fire("Ups!", "Error getting application", "error");
      }
    } catch (e) {
      console.log(e);
      await swal.fire("Ups!", "Error getting application", "error");
    }
    //recaptchaRef.current.reset();
    stopLoading();
  };

  const getMyLandlordAPI = async () => {
    try {
      startLoading();
      var res = await Api.landlord.getMyLandlord();

      console.log(res);


      if (await requestSuccess(res)) {
        var data = await res.json();
        console.log(data);
        setState((prevState) => ({
          ...prevState,
          landlord: data.landlord
        }));

      } else {
        await swal.fire("Ups!", "Error getting landlord", "error");
      }
    } catch (e) {
      console.log(e);
      await swal.fire("Ups!", "Error getting landlord", "error");
    }
    //recaptchaRef.current.reset();
    stopLoading();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitApplication)}>
        <div className="flex h-[100dvh]">
          <div className="relative flex flex-col flex-1 bg-smoke dark:bg-slate-900">
            <main className={disabled ? "submitted" : "grow"}>
              <div className="rounded overflow-hidden shadow-lg bg-white">
                <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-3 w-full mx-auto">
                  <HeaderForm />
                </div>
                <hr className=""></hr>
                <fieldset>
                  <GeneralInformation complexes={state.complexes} application={state.application} landlord={state.landlord} />
                </fieldset>
                <hr className=""></hr>
                <fieldset>
                  <Footer />
                </fieldset>
              </div>
            </main>


          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default VerificationOfRentalHistory;
