import React, { useEffect, useState } from "react";
import swal from 'sweetalert2';
import { useFormContext } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import { requestSuccess, validEmail } from "../../utils/Utils";
import Api from "../../utils/api";
import EmailInput from "../../components/inputs/EmailInput";
import PhoneInput from "../../components/inputs/PhoneInput";
//import PhoneInputCustom from "../../components/inputs/PhoneInput";

function GeneralInformation() {
  const { register } = useFormContext();
  const { isAuthenticated } = useAuth();
  const { user } = useUser();
  const [state, setState] = useState({
    application: {
    }
  });

  const handleChangeEmail = (e) => {
    var { value } = e.target;
    if (validEmail(value)) {
      getUserByEmailAPI(value);
    }
  }

  const getUserByEmailAPI = async (email) => {
    try {
      var res = await Api.users.getByEmail(email);

      console.log(res);

      if (res.ok) {
        var data = await res.json();
        if (data?.user?._id) {
          await swal.fire("Info", "We found an user with your email, please login", "info");
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

  return (

    <div className="px-5 pt-3 pb-4 text-base font-medium flex flex-col gap-3">

      <h2 className="text-xl font-bold mr-auto uppercase">General Information</h2>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">First Name:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            id="given_name"
            {...register('given_name')}

            required
          />
        </div>

        <div className="grid col-span-4">
          <label className="block">Last Name:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            id="family_name"
            {...register('family_name')}

            required
          />
        </div>

        <div className="grid col-span-4">
          <label className="block">Email:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <EmailInput name={'email'} required={true} readOnly={isAuthenticated && user} onChange={handleChangeEmail} />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        {!isAuthenticated && (
          <div className="grid col-span-4">
            <label className="block">Password:</label>
            <div>
              <span className="pmrequired">*Required</span>
            </div>
            <input
              className="w-full rounded border-slate-300"
              type="password"
              id="password"
              {...register('password')}

              required
            />
          </div>
        )}

        <div className="grid col-span-4">
          <label className="block">Community:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            id="community"
            {...register('community')}

            required
          />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">Leasing Agent:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            id="leasing_agent"
            {...register('leasing_agent')}

            required
          />
        </div>

        <div className="grid col-span-4">
          <label className="block">Government Issued ID:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            id="gov_issued_id"
            {...register('gov_issued_id')}

            required
          />
        </div>

        <div className="grid col-span-4">
          <label className="block">State/Country Issue ID:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            id="state_country_issue_id"
            {...register('state_country_issue_id')}

            required
          />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-2">
          <label className="block">Birth Date:</label>
          <input
            className="w-full rounded border-slate-300 mt-4"
            type="date"
            id="birth_date"
            {...register('birth_date')}

          />
        </div>

        <div className="grid col-span-2">
          <label className="block">Cell Phone:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <PhoneInput name={'cel_phone'} required={true} readOnly={false} />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-2">
          <label className="block">Home Phone:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <PhoneInput name={'home_phone'} required={true} readOnly={false} />
        </div>

        <div className="grid col-span-2">
          <label className="block">Work Phone:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <PhoneInput name={'work_phone'} required={true} readOnly={false} />
        </div>

        <div className="grid col-span-4">
          <label className="block mb-4">All Other Names:</label>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            id="all_other_names"
            {...register('all_other_names')}

          />
        </div>
      </div>
    </div>
  );
}

export default GeneralInformation;
