import React from "react";
import { useFormContext } from 'react-hook-form';

function CriminalRecord({ onUpdate }) {

  const { register } = useFormContext();

  const handleChangeCheckBox = (e) => {
    var { id, checked } = e.target;
    console.log(id, checked);
    onUpdate(id, checked);
  }

  const handleChange = (e) => {
    var { id, value } = e.target;
    console.log(id, value);
    onUpdate(id, value);
  }

  return (
    <div className="px-5 pt-3 text-base font-medium">
      <h2 className="text-xl font-bold mb-3">
        CRIMINAL RECORD
      </h2>


      <div className="grid mb-3">

        <label>
          Answering yes to the below question will result in an automatic denial:
        </label>

        <div className="flex mb-3" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            onClick={handleChangeCheckBox}
            id="sex_offender_registry"
            {...register('sex_offender_registry')}
          /><span className="self-center">Are you currently registered or being considered for registration on any sex offender registry?</span>
        </div>

        <label>
          Answering yes to the below questions may adversely affect your application. However, you have the opportunity to provide additional information regarding the issues in the space provided:
        </label>
        <div className="flex" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            onClick={handleChangeCheckBox}
            id="convicted_sex_crime"
            {...register('convicted_sex_crime')}
          /><span className="self-center">Have you or any person anticipated to occupy the premises ever been convicted in any sex related crime?</span>
        </div>

        <div className="flex" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            {...register('sex_offender_list')}
            id="sex_offender_list"
          /><span className="self-center">Are you or any person anticipated to occupy the premises now or have ever been listed on any sex offender list?</span>
        </div>

        <div className="flex" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            onClick={handleChangeCheckBox}
            {...register('anytype_criminal_offense')}
            id="anytype_criminal_offense"
          /><span className="self-center">Do you or any person anticipated to occupy the premises have any pending case or action relating to any type of criminal offense?</span>
        </div>

        <div className="flex" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            onClick={handleChangeCheckBox}
            {...register('outstanding_warrants')}
            id="outstanding_warrants"
          /><span className="self-center">Do you or any person anticipated to occupy the premises have any outstanding warrants?</span>
        </div>

        <div className="flex" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            onClick={handleChangeCheckBox}
            {...register('ilicit_drugs')}
            id="ilicit_drugs"
          /><span className="self-center">Have you ever possessed, sold, or used illicit drugs or narcotics in or about your residence?</span>
        </div>

        <div className="flex" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            onClick={handleChangeCheckBox}
            {...register('convicted_any_criminal_offense')}
            id="convicted_any_criminal_offense"
          /><span className="self-center">Have you or any person anticipated to occupy the premises ever been convicted of any criminal offense (misdemeanor or felony)?</span>
        </div>

        <div className="flex" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            onClick={handleChangeCheckBox}
            {...register('plea_aggrement')}
            id="plea_aggrement"
          /><span className="self-center">Have you or any person anticipated to occupy the premises ever been part of a plea agreement relating to any criminal activity?</span>
        </div>

        <div className="flex" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            onClick={handleChangeCheckBox}
            {...register('criminal_record_not_disclosed')}
            id="criminal_record_not_disclosed"
          /><span className="self-center">Have you or any person anticipated to occupy the premises have any criminal record not previously disclosed above?</span>
        </div>

        <div className="flex" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            onClick={handleChangeCheckBox}
            {...register('evicted_or_failed_rent')}
            id="evicted_or_failed_rent"
          /><span className="self-center">Have you been evicted or failed to pay rent for any reason in the past 7 years?</span>
        </div>

        <div className="flex" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            onClick={handleChangeCheckBox}
            {...register('filled_for_bankrupcy')}
            id="filled_for_bankrupcy"
          /><span className="self-center">Have you filed for bankruptcy in the past 7 years?</span>
        </div>

        <div className="flex" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            onClick={handleChangeCheckBox}
            {...register('bankrupcy_discharged')}
            id="bankrupcy_discharged"
          /><span className="self-center">Was the bankruptcy discharged?</span>
        </div>

        <div className="flex" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            onClick={handleChangeCheckBox}
            {...register('civil_judgment')}
            id="civil_judgment"
          /><span className="self-center">Has a civil judgment been entered against you for the collection of a debt in the past 7 years?</span>
        </div>

        <div className="flex" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            onClick={handleChangeCheckBox}
            {...register('animals_in_apartment')}
            id="animals_in_apartment"
          /><span className="self-center">Do you have or intend to have any animals in the apartment home?</span>
        </div>

        <div className="flex" >
          <input
            className="pmrequired-bg self-center mr-1 rounded border-slate-300"
            type="checkbox"
            onClick={handleChangeCheckBox}
            {...register('water_filled_furniture')}
            id="water_filled_furniture"
          /><span className="self-center">Do you have or intend to have water filled furniture in the apartment home?</span>
        </div>
      </div>

      <div className="mb-3">
        <textarea className="w-full border-slate-300 rounded"
          {...register('detailed_information')}
          id="detailed_information"
          onChange={handleChange}
          placeholder="If you answered yes to any of the above questions it may adversely affect your application. However, you have the opportuity to provide additional information regarding the issues. Please provide detailed information to assist in the review for any yes answer"
        >

        </textarea>
      </div>

      <div className="grid mb-3 gap-y-3">
        <div className="flex" >
          <span className="self-center mr-3">How did you hear of our community?</span>
          <input className="self-center border border-slate-300 rounded"
            type="text"
            id="how_you_know_us"
            onKeyUpCapture={handleChange}
            {...register('how_you_know_us')}
          />
        </div>

        <div className="flex" >
          <span className="self-center mr-3">How long do you expect to stay?</span>
          <input className="self-center border border-slate-300 rounded"
            type="text"
            id="expect_to_stay"
            onKeyUpCapture={handleChange}
            {...register('expect_to_stay')}
          />
        </div>
      </div>

      <div>
        <label className="mb-3">
          KEEPING OF ANIMAL/PET REQUIRES CONSENT OF MANAGEMENT, PAYMENT OF APPLICABLE FEES/DEPOSITS, AND EXECUTION OF PET ADDENDUM. ASSISTANCE ANIMALS USED FOR DISABILITIES ARE NOT CONSIDERED PETS.
        </label>
        <label className="mb-3">
          The Civil Rights Act of 1968, as amended by the Fair Housing Amendments Act of 1988, and all applicable Federal, State and Local Fair Housing laws, prohibits discrimination in the rental of housing based on race, color, religion, national origin, familial status, disability, marital status, age, ancestry, sexual orientation, medical condition, source of income, gender, gender identity, gender expression genetic information, citizenship, immigration status, primary language spoken, or any arbitrary basis. The Federal Agency, which administers compliance with this law, is the U.S. Department of Housing and Urban Development.
        </label>
        <label className="mb-3">
          This is to inform you that as part of our procedure for processing your application, an Investigative Consumer Report may be prepared whereby information obtained through personal interviews with your landlord, employer, or others with whom you are acquainted. This inquiry includes information as to your character, general reputation, personal characteristics, mode of living and credit reports. You have the right to make a written request within a reasonable period of time to receive additional detailed information about the nature and scope of this investigation (Fair Credit Reporting Act). I/We hereby agree, in the event of the approval of this application, to execute a lease in accordance with the terms set forth in this rental application and my/our rental liability shall comme pursuant to the terms of the lease. That if I/We fail to sign the lease and/or pay agreed rental, security deposit, utility fees, or other required charges as shown in this rental application the holding accompanying this application shall be retained by landlord as liquidated damages and I/We agree to landlord retraining as a reasonable estimate of actual damages to landlord if I/We fail to perform stated above after approval, I/We understand that the holding fees accompanying this application are non-refundable after 72 hours of acceptance of application. The holding fee is refundable application is denied. Owner and/or agent for the owner reserves the right to reject this application and to refuse possession of the above-mentioned accommodation. I/We have read the foreg certify that the information herein is TRUE and CORRECT, that this application is submitted for the purpose of inducing approval of this application in my/our behalf. Any "yes" or "no" questions unanswered shall be considered a "yes".
        </label>
      </div>
    </div>
  );
}

export default CriminalRecord;
