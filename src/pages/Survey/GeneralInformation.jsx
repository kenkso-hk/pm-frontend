
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import swal from 'sweetalert2';
import EmailInput from "../../components/inputs/EmailInput";
import PhoneInput from "../../components/inputs/PhoneInput";

function GeneralInformation(props) {
  const { register, setValue } = useFormContext();
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

  const handleChangeNumber = (e)=>{
    var {id, value} = e.target;
    if(value < 0) value = 0;
    setValue(id, value);
  }

  const [lettersOfNoncompliance, setLettersOfNoncompliance] = useState(false);
  const [damages, setDamages] = useState(false);
  const [pets, setPets] = useState(false);
  const [moneyOwed, setMoneyOwed] = useState(false);
  const [professionallyManaged, setProfessionallyManaged] = useState(false);

  const handleChangeManager = (e) => {
    var { id, value } = e.target;
    if (value === "Management Firm") {
      setProfessionallyManaged(true);
    } else {
      setProfessionallyManaged(false);
    }
  }

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
            disabled={true}
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
            disabled={true}
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
            <span className="pmrequired"></span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            disabled={true}
            {...register('owner_fax')}
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
          <label className="block">Property Address:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <select
            className="w-full rounded border-slate-300"
            type="text"
            disabled={true}
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
            {...register('applicant_name')}
            required
          />
        </div>

      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">Apartment/Suite:</label>
          <div>
            <span className="pmrequired"></span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            {...register('apartment_number')}
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
            <option value={""}>Select an option</option>
            <option value={"Current"}>Current</option>
            <option value={"Previous"}>Previous</option>
          </select>
        </div>
        <div className="grid col-span-4">
          <label className="block">Number of occupants under -18:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="number"
            {...register('number_occupants_under_18')}
            min={0}
            id="number_occupants_under_18"
            onChange={handleChangeNumber}
            required
          />
        </div>
        <div className="grid col-span-4">
          <label className="block">Number of occupants 18+:</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="number"
            {...register('number_occupants_older_18')}
            min={0}
            id="number_occupants_older_18"
            onChange={handleChangeNumber}
            required
          />
        </div>
      </div>

      <div className="grid gap-x-5 grid-cols-1 md:grid-cols-12">

        <div className="grid col-span-12">
          Move-In/Move-Out Information
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
            value={true}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("notice_30_60_days")}
            type="radio"
            name="notice_30_60_days"
            value={false}
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
            min={0}
            id="monthly_rent_amount"
            onChange={handleChangeNumber}
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
            value={true}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("pays_on_time")}
            type="radio"
            name="pays_on_time"
            value={false}
            className="ml-5 mt-1 border-slate-300"
            required
          />
          <label className="ml-1">No</label>
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">How many times did the tenant make a late rent payment?</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="number"
            {...register('number_late_payments')}
            min={0}
            id="number_late_payments"
            onChange={handleChangeNumber}
            required
          />
        </div>
        <div className="grid col-span-4">
          <label className="block">How many NSF (Non-Sufficient Funds) checks were received from the tenant?</label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="number"
            {...register('number_NSF_checks')}
            min={0}
            id="number_NSF_checks"
            onChange={handleChangeNumber}
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
            value={true}
            onChange={(e) => { setLettersOfNoncompliance(true) }}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("non_compliance")}
            type="radio"
            name="non_compliance"
            value={false}
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
              <span className="pmrequired"></span>
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
            value={true}
            onChange={(e) => { setDamages(true) }}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("any_damage")}
            type="radio"
            name="any_damage"
            value={false}
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
              <span className="pmrequired"></span>
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
            value={true}
            onChange={(e) => { setPets(true) }}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("any_pets")}
            type="radio"
            name="any_pets"
            value={false}
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
              <span className="pmrequired"></span>
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
          Does the tenant have any unpaid charges or balances with your property?
        </label>
        <span className="pmrequired">*Required</span>
        <div className="flex">
          <input
            {...register("money_owed")}
            type="radio"
            name="money_owed"
            value={true}
            onChange={(e) => { setMoneyOwed(true) }}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("money_owed")}
            type="radio"
            name="money_owed"
            value={false}
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
              <span className="pmrequired"></span>
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
          Was the tenant's security deposit fully refunded?
        </label>
        <span className="pmrequired">*Required</span>
        <div className="flex">
          <input
            {...register("security_deposit_refunded")}
            type="radio"
            name="security_deposit_refunded"
            value={true}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("security_deposit_refunded")}
            type="radio"
            name="security_deposit_refunded"
            value={false}
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
            value={true}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("rent_again_to_renter")}
            type="radio"
            name="rent_again_to_renter"
            value={false}
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
            value={true}
            className="mt-1 border-slate-300"
            required
          />
          <label className="ml-1">Yes</label>

          <input
            {...register("related_to_applicant")}
            type="radio"
            name="related_to_applicant"
            value={false}
            className="ml-5 mt-1 border-slate-300"
            required
          />
          <label className="ml-1">No</label>
        </div>
      </div>


      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label>
            Was the property under the management of the owner or handled by a third-party property management firm?
          </label>
          <div>
            <span className="pmrequired">*Required</span>
          </div>
          <select
            className="w-full rounded border-slate-300"
            type="text"
            {...register('manager_type')}
            onChange={handleChangeManager}
            required>
            <option value={null}>Select an option</option>
            <option value={"Owner"}>Owner</option>
            <option value={"Management Firm"}>Management Firm</option>
          </select>
        </div>
      </div>

      {
        professionallyManaged ? <>

          <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
            <div className="grid col-span-4">
              <label className="block">Management company name:</label>
              <div>
                <span className="pmrequired"></span>
              </div>
              <input
                className="w-full rounded border-slate-300"
                type="text"
                {...register('management_company_name')}
              />
            </div>
          </div>

        </> : null
      }
      <div className="grid gap-5 grid-cols-1 md:grid-cols-12">
        <div className="grid col-span-4">
          <label className="block">Do you have any concerns or feedback regarding the tenant?</label>
          <div>
            <span className="pmrequired"></span>
          </div>
          <input
            className="w-full rounded border-slate-300"
            type="text"
            {...register('complaints_or_comments')}
          />
        </div>
      </div>
    </div >
  );
}

export default GeneralInformation;
