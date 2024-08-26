
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import swal from 'sweetalert2';
import EmailInput from "../../components/inputs/EmailInput";
import PhoneInput from "../../components/inputs/PhoneInput";

function GeneralInformation(props) {
  const { register } = useFormContext();
  const [state, setState] = useState({
    complexes: []
  })

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      complexes: props.complexes,
      application: props.application,
      landlord: props.landlord
    }))
  }, [props]);

  const [lettersOfNoncompliance, setLettersOfNoncompliance] = useState(false);
  const [damages, setDamages] = useState(false);
  const [pets, setPets] = useState(false);
  const [moneyOwed, setMoneyOwed] = useState(false);
  const [privateOwner, setPrivateOwner] = useState(false);
  const [professionallyManaged, setProfessionallyManaged] = useState(false);

  return (

    <div className="px-5 pt-3 pb-4 text-base font-medium flex flex-col gap-3">

      <h2 className="text-xl font-bold mr-auto uppercase">General Information</h2>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">Attention To:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            disabled="true"
            {...register('attention_to')}
            required
          />
        </div>

        <div className="grid col-span-4">
          <label className="block">Property/Owner Name:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            disabled="true"
            {...register('owner_name')}
            required
          />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">Phone #:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <PhoneInput name={"onwer_phone"} readOnly={true} />
        </div>

        <div className="grid col-span-4">
          <label className="block">Fax #:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            disabled="true"
            {...register('owner_fax')}
            required
          />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">Email Address:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <EmailInput name={'owner_email'} required={true} readOnly={true} />
        </div>
        <div className="grid col-span-4">
          <label className="block">Complex:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <select
            className="w-full rounded border-slate-300"
            type="text"
            disabled="true"
            {...register('complex')}
            required>
            <option value={null}>Select an option</option>
            {props.complexes.map((complex, index) => (
              <option value={complex._id} key={index}>{complex.name}, {complex.address}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">Applicant Names:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            value={state.application?.user?.given_name + " " + state.application?.user?.family_name || null}
            {...register('applicant_name')}
            required
          />
        </div>

      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">Apt #:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            {...register('apartment_number')}
            required
          />
        </div>
        <div className="grid col-span-4">
          <label className="block">Current/Previous:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <select
            className="w-full rounded border-slate-300"
            type="text"
            {...register('current_previous')}
            required>
            <option value={null}>Select an option</option>
            <option value={"Current"}>Current</option>
            <option value={"Previous"}>Previous</option>
          </select>
        </div>
        <div className="grid col-span-4">
          <label className="block">Number of occupants:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="number"
            {...register('number_occupants')}
            required
          />
        </div>
      </div>

      <div className="grid gap-x-5 grid-cols-1 md:grid-cols-12">

        <div className="grid col-span-12">
          Dates of Residency
        </div>

        <div className="grid col-span-4">
          <label className="block">Move in:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="date"
            {...register('move_in_date')}
            required
          />
        </div>
        <div className="grid col-span-4">
          <label className="block">Move out:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="date"
            {...register('move_out_date')}
            required
          />
        </div>
      </div>

      <div className="grid">
        <label>
          Did resident give proper 30/60 day notice?
        </label>
        <span className="pmrequired">*Required</span>
        <div className="flex">
          <input
            {...register("notice_30_60_days")}
            type="radio"
            name="notice_30_60_days"
            value="true"
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("notice_30_60_days")}
            type="radio"
            name="notice_30_60_days"
            value="false"
            className="ml-5 mt-1 border-slate-300"
            required
          />
          <label className="ml-1">No</label>
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">Lease Expiration Date:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>

          <input
            className="w-full rounded border-slate-300"
            type="date"
            {...register('lease_expiration_date')}
            required
          />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">Lease fulfilled/broken/month to month:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <select
            className="w-full rounded border-slate-300"
            type="text"
            {...register('rental_type')}
            required>
            <option value={null}>Select an option</option>
            <option value={"Lease fulfilled"}>Lease fulfilled</option>
            <option value={"Broken"}>Broken</option>
            <option value={"Month to month"}>Month to month</option>
          </select>
        </div>
        <div className="grid col-span-4">
          <label className="block">Skip/Eviction Date:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="date"
            {...register('eviction_date')}
          />
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">Monthly Rent Payment:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="number"
            {...register('monthly_rent_amount')}
            required
          />
        </div>
      </div>

      <div className="grid">
        <label>
          Pays on time?
        </label>
        <span className="pmrequired">*Required</span>
        <div className="flex">
          <input
            {...register("pays_on_time")}
            type="radio"
            name="pays_on_time"
            value="true"
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("pays_on_time")}
            type="radio"
            name="pays_on_time"
            value="false"
            className="ml-5 mt-1 border-slate-300"
            required
          />
          <label className="ml-1">No</label>
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">Number of late payment</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="number"
            {...register('number_late_payments')}
            required
          />
        </div>
        <div className="grid col-span-4">
          <label className="block">Number of NSF Checks:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="number"
            {...register('number_NSF_checks')}
            required
          />
        </div>
      </div>

      <div className="grid">
        <label>
          Any letters of non-compliance?
        </label>
        <span className="pmrequired">*Required</span>
        <div className="flex">
          <input
            {...register("non_compliance")}
            type="radio"
            name="non_compliance"
            value="true"
            onChange={(e) => { setLettersOfNoncompliance(true) }}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("non_compliance")}
            type="radio"
            name="non_compliance"
            value="false"
            onChange={(e) => { setLettersOfNoncompliance(false) }}
            className="ml-5 mt-1 border-slate-300"
            required
          />
          <label className="ml-1">No</label>
        </div>
      </div>

      {lettersOfNoncompliance ? <>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
          <div className="grid col-span-12">
            <label className="block">Reason:</label>
            <div>
              <span className="pmrequired">*</span>
            </div>
            <input
              className="w-full rounded border-slate-300"
              type="text"
              {...register('non_compliance_reason')}
            />
          </div>
        </div>
      </> : null}

      <div className="grid">
        <label>
          Any damages?
        </label>
        <span className="pmrequired">*Required</span>
        <div className="flex">
          <input
            {...register("any_damage")}
            type="radio"
            name="any_damage"
            value="true"
            onChange={(e) => { setDamages(true) }}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("any_damage")}
            type="radio"
            name="any_damage"
            value="false"
            onChange={(e) => { setDamages(false) }}
            className="ml-5 mt-1 border-slate-300"
            required
          />
          <label className="ml-1">No</label>
        </div>
      </div>

      {damages ? <>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
          <div className="grid col-span-12">
            <label className="block">If yes explain:</label>
            <div>
              <span className="pmrequired">*</span>
            </div>
            <input
              className="w-full rounded border-slate-300"
              type="text"
              {...register('damage_explanation')}
            />
          </div>
        </div>

      </> : null}

      <div className="grid">
        <label>
          Any pets?
        </label>
        <span className="pmrequired">*Required</span>
        <div className="flex">
          <input
            {...register("any_pets")}
            type="radio"
            name="any_pets"
            value="true"
            onChange={(e) => { setPets(true) }}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("any_pets")}
            type="radio"
            name="any_pets"
            value="false"
            onChange={(e) => { setPets(false) }}
            className="ml-5 mt-1 border-slate-300"
            required
          />
          <label className="ml-1">No</label>
        </div>
      </div>

      {pets ? <>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
          <div className="grid col-span-12">
            <label className="block">If yes how many and what kind?:</label>
            <div>
              <span className="pmrequired">*Required</span>
            </div>
            <input
              className="w-full rounded border-slate-300"
              type="text"
              {...register('pets_explanation')}
            />
          </div>
        </div>
      </> : null}

      <div className="grid">
        <label>
          Any money owed to your complex?
        </label>
        <span className="pmrequired">*Required</span>
        <div className="flex">
          <input
            {...register("money_owed")}
            type="radio"
            name="money_owed"
            value="true"
            onChange={(e) => { setMoneyOwed(true) }}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("money_owed")}
            type="radio"
            name="money_owed"
            value="false"
            onChange={(e) => { setMoneyOwed(false) }}
            className="ml-5 mt-1 border-slate-300"
            required
          />
          <label className="ml-1">No</label>
        </div>
      </div>

      {moneyOwed ? <>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
          <div className="grid col-span-12">
            <label className="block">If yes, please explain why:</label>
            <div>
              <span className="pmrequired">*Required</span>
            </div>
            <input
              className="w-full rounded border-slate-300"
              type="text"
              {...register('owed_explanation')}
            />
          </div>
        </div>

      </> : null}

      <div className="grid">
        <label>
          Was their security deposit refunded?
        </label>
        <span className="pmrequired">*Required</span>
        <div className="flex">
          <input
            {...register("security_deposit_refunded")}
            type="radio"
            name="security_deposit_refunded"
            value="true"
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("security_deposit_refunded")}
            type="radio"
            name="security_deposit_refunded"
            value="false"
            className="ml-5 mt-1 border-slate-300"
            required
          />
          <label className="ml-1">No</label>
        </div>
      </div>

      <div className="grid">
        <label>
          Would you re-rent to this resident?
        </label>
        <span className="pmrequired">*Required</span>
        <div className="flex">
          <input
            {...register("rent_again_to_renter")}
            type="radio"
            name="rent_again_to_renter"
            value="true"
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("rent_again_to_renter")}
            type="radio"
            name="rent_again_to_renter"
            value="false"
            className="ml-5 mt-1 border-slate-300"
            required
          />
          <label className="ml-1">No</label>
        </div>
      </div>

      <div className="grid">
        <label>
          Are you related to this applicant?
        </label>
        <span className="pmrequired">*Required</span>
        <div className="flex">
          <input
            {...register("related_to_applicant")}
            type="radio"
            name="related_to_applicant"
            value="true"
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("related_to_applicant")}
            type="radio"
            name="related_to_applicant"
            value="false"
            className="ml-5 mt-1 border-slate-300"
            required
          />
          <label className="ml-1">No</label>
        </div>
      </div>


      <div className="grid">
        <label>
          Private owner?
        </label>
        <span className="pmrequired">*Required</span>
        <div className="flex">
          <input
            {...register("private_owner")}
            type="radio"
            name="private_owner"
            value="true"
            onChange={(e) => { setPrivateOwner(true) }}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("private_owner")}
            type="radio"
            name="private_owner"
            value="false"
            onChange={(e) => { setPrivateOwner(false) }}
            className="ml-5 mt-1 border-slate-300"
            required
          />
          <label className="ml-1">No</label>
        </div>
      </div>

      {privateOwner ? <>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
          <div className="grid col-span-4">
            <label className="block">Name of owner:</label>
            <div>
              <span className="pmrequired">*Required</span>
            </div>
            <input
              className="w-full rounded border-slate-300"
              type="text"
              {...register('owner_name')}
              required
            />
          </div>
        </div>
      </> : null}

      <div className="grid">
        <label>
          Professionally managed?
        </label>
        <span className="pmrequired">*Required</span>
        <div className="flex">
          <input
            {...register("professionally_managed")}
            type="radio"
            name="professionally_managed"
            value="true"
            onChange={(e) => { setProfessionallyManaged(true) }}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("professionally_managed")}
            type="radio"
            name="professionally_managed"
            value="false"
            onChange={(e) => { setProfessionallyManaged(false) }}
            className="ml-5 mt-1 border-slate-300"
            required
          />
          <label className="ml-1">No</label>
        </div>
      </div>

      {professionallyManaged ? <>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
          <div className="grid col-span-4">
            <label className="block">Management company name:</label>
            <div>
              <span className="pmrequired">*</span>
            </div>
            <input
              className="w-full rounded border-slate-300"
              type="text"
              {...register('management_company_name')}
            />
          </div>
        </div>

      </> : null}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">Any Complaints or Comments?:</label>
          <div>
            <span className="pmrequired">*</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            {...register('complaints_or_comments')}
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralInformation;
