import React from "react";
import { useFormContext } from "react-hook-form";

function GeneralInformation({onUpdate}) {
  const { register } = useFormContext();

  const handleChange = (e) => {
    var { id, value } = e.target;
    onUpdate(id, value);
  }

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
            onChange={handleChange}
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
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid col-span-4">
          <label className="block">Email:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="email"
            id="email"
            {...register('email')}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
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
            onChange={handleChange}
            required
          />
        </div>

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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>

        <div className="grid col-span-2">
          <label className="block">Cell Phone:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            placeholder="( ___ ) ___-____"
            type="text"
            id="cel_phone"
            {...register('cel_phone')}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-2">
          <label className="block">Home Phone:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            placeholder="( ___ ) ___-____"
            type="text"
            id="home_phone"
            {...register('home_phone')}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid col-span-2">
          <label className="block">Work Phone:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            placeholder="( ___ ) ___-____"
            type="text"
            id="work_phone"
            {...register('work_phone')}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid col-span-4">
          <label className="block mb-4">All Other Names:</label>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            id="all_other_names"
            {...register('all_other_names')}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralInformation;
