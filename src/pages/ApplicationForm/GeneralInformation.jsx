import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import swal from 'sweetalert2';
import { useFormContext } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import { validEmail } from "../../utils/Utils";
import Api from "../../utils/api";
import EmailInput from "../../components/inputs/EmailInput";
import PhoneInput from "../../components/inputs/PhoneInput";

const GeneralInformation = forwardRef((props, ref) => {
  const { register, watch } = useFormContext();
  const { isAuthenticated } = useAuth();
  const { user } = useUser();
  const [errorFields, setErrorFields] = useState({});
  const [state, setState] = useState({
    application: {}
  });

  const handleChangeEmail = (e) => {
    var { value } = e.target;
    if (validEmail(value)) {
      getUserByEmailAPI(value);
    }
  };

  const getUserByEmailAPI = async (email) => {
    try {
      var res = await Api.users.getByEmail(email);
      if (res.ok) {
        var data = await res.json();
        if (data?.user?._id) {
          await swal.fire("Info", "We found a user with your email, please login", "info");
          window.location.href = "/";
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (isAuthenticated) {
      setState((prevState) => ({
        ...prevState,
        application: {
          ...prevState.application,
          email: user.email
        }
      }));
    }
  }, [user]);

  // Exponer la función de validación a través del ref
  useImperativeHandle(ref, () => ({
    validateForm() {
      const fieldsToValidate = [
        "given_name",
        "family_name",
        "email",
        "password",
        "community",
        "leasing_agent",
        "gov_issued_id",
        "state_country_issue_id",
        "cel_phone",
        "home_phone",
        "work_phone",
      ];

      let newErrorFields = {};

      fieldsToValidate.forEach(field => {
        if (!watch(field)) {
          newErrorFields[field] = true;
        }
      });

      setErrorFields(newErrorFields);

      return Object.keys(newErrorFields).length === 0;
    }
  }));

  return (
    <div className="px-5 pt-3 pb-4 text-base font-medium flex flex-col gap-3">
      <h2 className="text-xl font-bold mr-auto uppercase">General Information</h2>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid col-span-1">
          <label className="block">First Name <span className="text-red-500">*</span>:</label>
          <input
            className={`w-full rounded ${errorFields.given_name ? 'border-red-500' : 'border-slate-300'}`}
            type="text"
            id="given_name"
            {...register('given_name')}
          />
          {errorFields.given_name && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        <div className="grid col-span-1">
          <label className="block">Last Name <span className="text-red-500">*</span>:</label>
          <input
            className={`w-full rounded ${errorFields.family_name ? 'border-red-500' : 'border-slate-300'}`}
            type="text"
            id="family_name"
            {...register('family_name')}
          />
          {errorFields.family_name && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        <div className="grid col-span-1">
          <label className="block">Email <span className="text-red-500">*</span>:</label>
          <EmailInput 
            name={'email'} 
            required={true} 
            readOnly={isAuthenticated && user} 
            onChange={handleChangeEmail} 
            className={`${errorFields.email ? 'border-red-500' : 'border-slate-300'}`}  // Aplicar clase de error
          />
          {errorFields.email && <p className="text-red-500 text-sm">This field is required</p>}
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {!isAuthenticated && (
          <div className="grid col-span-1">
            <label className="block">Password <span className="text-red-500">*</span>:</label>
            <input
              className={`w-full rounded ${errorFields.password ? 'border-red-500' : 'border-slate-300'}`}
              type="password"
              id="password"
              {...register('password')}
            />
            {errorFields.password && <p className="text-red-500 text-sm">This field is required</p>}
          </div>
        )}

        <div className="grid col-span-1">
          <label className="block">Community <span className="text-red-500">*</span>:</label>
          <input
            className={`w-full rounded ${errorFields.community ? 'border-red-500' : 'border-slate-300'}`}
            type="text"
            id="community"
            {...register('community')}
          />
          {errorFields.community && <p className="text-red-500 text-sm">This field is required</p>}
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid col-span-1">
          <label className="block">Leasing Agent <span className="text-red-500">*</span>:</label>
          <input
            className={`w-full rounded ${errorFields.leasing_agent ? 'border-red-500' : 'border-slate-300'}`}
            type="text"
            id="leasing_agent"
            {...register('leasing_agent')}
          />
          {errorFields.leasing_agent && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        <div className="grid col-span-1">
          <label className="block">Government Issued ID <span className="text-red-500">*</span>:</label>
          <input
            className={`w-full rounded ${errorFields.gov_issued_id ? 'border-red-500' : 'border-slate-300'}`}
            type="text"
            id="gov_issued_id"
            {...register('gov_issued_id')}
          />
          {errorFields.gov_issued_id && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        <div className="grid col-span-1">
          <label className="block">State/Country Issue ID <span className="text-red-500">*</span>:</label>
          <input
            className={`w-full rounded ${errorFields.state_country_issue_id ? 'border-red-500' : 'border-slate-300'}`}
            type="text"
            id="state_country_issue_id"
            {...register('state_country_issue_id')}
          />
          {errorFields.state_country_issue_id && <p className="text-red-500 text-sm">This field is required</p>}
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid col-span-1">
          <label className="block">Birth Date <span className="text-red-500">*</span>:</label>
          <input
            className={`w-full rounded ${errorFields.birth_date ? 'border-red-500' : 'border-slate-300'}`}
            type="date"
            id="birth_date"
            {...register('birth_date')}
          />
          {errorFields.birth_date && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        <div className="grid col-span-1">
          <label className="block">Cell Phone <span className="text-red-500">*</span>:</label>
          <PhoneInput 
            name={'cel_phone'} 
            required={true} 
            readOnly={false} 
            className={`${errorFields.cel_phone ? 'border-red-500' : 'border-slate-300'}`}
          />
          {errorFields.cel_phone && <p className="text-red-500 text-sm">This field is required</p>}
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid col-span-1">
          <label className="block">Home Phone <span className="text-red-500">*</span>:</label>
          <PhoneInput 
            name={'home_phone'} 
            required={true} 
            readOnly={false} 
            className={`${errorFields.home_phone ? 'border-red-500' : 'border-slate-300'}`}
          />
          {errorFields.home_phone && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        <div className="grid col-span-1">
          <label className="block">Work Phone <span className="text-red-500">*</span>:</label>
          <PhoneInput 
            name={'work_phone'} 
            required={true} 
            readOnly={false} 
            className={`${errorFields.work_phone ? 'border-red-500' : 'border-slate-300'}`}
          />
          {errorFields.work_phone && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        <div className="grid col-span-1">
          <label className="block">All Other Names <span className="text-red-500">*</span>:</label>
          <input
            className={`w-full rounded ${errorFields.all_other_names ? 'border-red-500' : 'border-slate-300'}`}
            type="text"
            id="all_other_names"
            {...register('all_other_names')}
          />
          {errorFields.all_other_names && <p className="text-red-500 text-sm">This field is required</p>}
        </div>
      </div>
    </div>
  );
});

export default GeneralInformation;
