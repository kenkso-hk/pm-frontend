import React, { useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import HeaderForm from "../ApplicationForm/HeaderForm";
import GeneralInformation from "../ApplicationForm/GeneralInformation";
import MinorsToOccupy from "../ApplicationForm/MinorsToOccupy";
import ApplicantIncomes from "../ApplicationForm/ApplicantIncomes";
import ResidenceHistory from "../ApplicationForm/RentalHistory";
import AnimalsInformation from "../ApplicationForm/AnimalsInformation";
import EmergencyContact from "../ApplicationForm/EmergencyContact";
import Vehicles from "../ApplicationForm/Vehicles";
import CriminalRecord from "../ApplicationForm/CriminalRecord";
import Footer from "../ApplicationForm/Footer";

import useLoading from '../../hooks/useLoading';


import { requestSuccess, validEmail } from '../../utils/Utils';

import swal from 'sweetalert2';
import Api from '../../utils/api';

function ApplicationAndOffer() {
  const { startLoading, stopLoading } = useLoading();
  const methods = useForm();
  const { getValues, handleSubmit, formState: { isSubmitSuccessful } } = methods;
  const [disabled, setDisabled] = useState(false);
  const [state, setState] = useState({

  });

  const submitApplication = async () => {
    const data = getValues();
    setDisabled(true);
    console.log(data);
    await createUserClick(data);
  };

  const handleDataFromChildArray = (data, childName) => {
    setState((prevState) => ({
      ...prevState,
      register: {
        ...prevState.register,
        [childName]: data
      }
    }));
  };

  const handleDataFromChild = (id, value) => {
    setState((prevState) => ({
      ...prevState,
      register: {
        ...prevState.register,
        [id]: value
      }
    }));
    console.log(state);
  };

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
    for (const minor in data.minors_to_ocuppy) {
      if (new Date(data.minors_to_ocuppy[minor].birth_date) > new Date()) {
        await swal.fire("Ups!", "Please insert past date for the minor´s birthdate", "error");
        return false;
      }
    }
    return true;
  }

  const createUserClick = async (userData) => {
    try {
      if (!await validateData(userData)) return;
      startLoading();
      var res = await Api.users.create(userData);

      console.log(res);
      var data = await res.json();
      console.log(data);
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
          userData.email +
          ", please insert the verification code."
      });

      if (!ConfirmationCode) {

        return;
      }
      startLoading();
      res = await Api.auth.verifyEmail({
        email: userData.email,
        ConfirmationCode
      });

      data = await res.json();
      if (requestSuccess(res)) {
        stopLoading();
        await swal.fire("OK!", "Your email has been verified, and your application sended", "success");
        window.location.href = "/";
      } else {
        stopLoading();
        await swal.fire("Ups!", "Error verifying email." + data.msg, "error");

        return;
      }
    } catch (e) {
      console.log(e);
      stopLoading();
      await swal.fire("¡Ups!", "Failed to login. You may have problems with your internet connection.", "error");
    }
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
                  <GeneralInformation onUpdate={handleDataFromChild} />
                </fieldset>
                <hr className=""></hr>
                <fieldset>
                  <MinorsToOccupy onUpdate={handleDataFromChildArray} />
                </fieldset>
                <hr className=""></hr>
                <fieldset>
                  <ApplicantIncomes onUpdate={handleDataFromChildArray} />
                </fieldset>
                <hr className=""></hr>
                <fieldset>
                  <ResidenceHistory onUpdate={handleDataFromChildArray} />
                </fieldset>
                <hr className=""></hr>
                <fieldset>
                  <AnimalsInformation onUpdate={handleDataFromChildArray} />
                </fieldset>
                <hr className=""></hr>
                <fieldset>
                  <EmergencyContact onUpdate={handleDataFromChildArray} />
                </fieldset>
                <hr className=""></hr>
                <fieldset>
                  <Vehicles onUpdate={handleDataFromChildArray} />
                </fieldset>
                <hr className=""></hr>
                <fieldset>
                  <CriminalRecord onUpdate={handleDataFromChild} />
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

export default ApplicationAndOffer;
