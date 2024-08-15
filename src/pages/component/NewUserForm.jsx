import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import swal from 'sweetalert2';
import Api from '../../utils/api';
import { requestSuccess, validEmail } from '../../utils/Utils';



const NewUserForm = () => {
    const { register, handleSubmit, control, watch } = useForm();

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
            console.log(minor);
            if (new Date(data.minors_to_ocuppy[minor].birth_date) > new Date()) {
                await swal.fire("Ups!", "Please insert past date for the minor´s birthdate", "error");
                return false;
            }
        }
        return true;
    }

    const createUserClick = async (data) => {
        try {
            if (!await validateData(data)) return;
            //handleLoading(true);
            var res = await Api.users.createComplete(data);

            console.log(res);
            var data = await res.json();
            console.log(data);
            if (await requestSuccess(res)) {
                await swal.fire("OK!", "User created.", "success");
            } else {
                await swal.fire("Ups!", "Error creating user.", "error");
            }
        } catch (e) {
            console.log(e);
            await swal.fire("¡Ups!", "Failed to login. You may have problems with your internet connection.", "error");
        }
        //recaptchaRef.current.reset();
        //handleLoading(false);
    };

    const { fields: minorsFields, append: appendMinor, remove: removeMinor } = useFieldArray({
        control,
        name: 'minors_to_ocuppy'
    });

    const { fields: incomesFields, append: appendIncome, remove: removeIncome } = useFieldArray({
        control,
        name: 'applicant_incomes'
    });

    const { fields: residenceFields, append: appendResidence, remove: removeResidence } = useFieldArray({
        control,
        name: 'residence_history'
    });

    const { fields: animalsFields, append: appendAnimal, remove: removeAnimal } = useFieldArray({
        control,
        name: 'animals_information'
    });

    const { fields: emergencyFields, append: appendEmergency, remove: removeEmergency } = useFieldArray({
        control,
        name: 'emergency_contact'
    });

    const { fields: vehiclesFields, append: appendVehicle, remove: removeVehicle } = useFieldArray({
        control,
        name: 'vehicles'
    });

    return (
        <div className='container'>
            <form onSubmit={handleSubmit(createUserClick)}>
                <div>

                </div>
                <div className='row'>
                    <div className='col mb-3'>
                        <label className='mr-5'>First name</label>
                        <input {...register('given_name')} placeholder="First Name" required className="rounded border-slate-200" />

                    </div>
                    <div className='col mb-3'>
                        <label className='mr-5'>Last name</label>
                        <input {...register('family_name')} placeholder="Last Name" required className="rounded border-slate-200" />

                    </div>
                    <div className='col mb-3'>
                        <label className='mr-5'>Email</label>
                        <input {...register('email')} type="email" placeholder="Email" required className="rounded border-slate-200" />
                    </div>
                    <div className='col mb-3'>
                        <label className='mr-5'>Password</label>
                        <input {...register('password')} type="password" placeholder="Password" required className="rounded border-slate-200" />
                    </div>
                    <div className='col mb-3'>
                        <label className='mr-5'>Community</label>
                        <input {...register('community')} placeholder="Community" required className="rounded border-slate-200" />

                    </div>
                    <div className='col'>
                        <label className='mr-5'>Leasing Agent</label>
                        <input {...register('leasing_agent')} placeholder="Leasing Agent" required className="rounded border-slate-200 mb-4" />

                    </div>
                    <div className='col'>
                        <label className='mr-5'>Government Issued ID</label>
                        <input {...register('gov_issued_id')} placeholder="Government Issued ID" required className="rounded border-slate-200 mb-4" />
                    </div>
                    <div className='col'>
                        <label className='mr-5'>State/Country Issue ID</label>
                        <input {...register('state_country_issue_id')} placeholder="State/Country Issue ID" required className="rounded border-slate-200 mb-4" />
                    </div>
                    <div className='col'>
                        <label className='mr-5'>Birth Date</label>
                        <input {...register('birth_date')} type="date" placeholder="Birth Date" className="rounded border-slate-200 mb-4" />
                    </div>
                    <div className='col'>
                        <label className='mr-5'>Cell Phone</label>
                        <input {...register('cel_phone')} placeholder="Cell Phone" required className="rounded border-slate-200 mb-4" />
                    </div>
                    <div className='col'>
                        <label className='mr-5'>Home Phone</label>
                        <input {...register('home_phone')} placeholder="Home Phone" required className="rounded border-slate-200" />

                    </div>
                    <div className='col'>
                        <label className='mr-5'>Work Phone</label>
                        <input {...register('work_phone')} placeholder="Work Phone" required className="rounded border-slate-200" />
                    </div>
                    <div className='col'>
                        <label className='mr-5'>All Other Names</label>
                        <input {...register('all_other_names')} placeholder="All Other Names" className="rounded border-slate-200" />
                    </div>
                </div>





                <div className='mt-5 mb-5'>
                    <h3>Minors to Occupy</h3>
                    {minorsFields.map((field, index) => (
                        <div key={field.id}>
                            <input {...register(`minors_to_ocuppy.${index}.full_name`)} placeholder="Full Name" className="rounded border-slate-200" />
                            <input {...register(`minors_to_ocuppy.${index}.relationship`)} placeholder="Relationship" className="rounded border-slate-200" />
                            <input {...register(`minors_to_ocuppy.${index}.age`)} type="number" placeholder="Age" className="rounded border-slate-200" />
                            <input {...register(`minors_to_ocuppy.${index}.birth_date`)} type="date" placeholder="Birth Date" className="rounded border-slate-200" />
                            <button
                                className='btn rounded shadow-sm'
                                type="button" onClick={() => removeMinor(index)}>X</button>
                        </div>
                    ))}
                    <button
                        className='btn rounded shadow-sm border-2 border-[#008080] p-3 bg-[#008080] font-bold text-lg'
                        onClick={() => appendMinor({})} type="button">
                        Add Minor
                    </button>
                </div>

                <div className='mt-5 mb-5'>
                    <h3>Applicant Incomes</h3>
                    {incomesFields.map((field, index) => (
                        <div key={field.id}>
                            <input {...register(`applicant_incomes.${index}.company_name`)} placeholder="Company Name" className="rounded border-slate-200" />
                            <input {...register(`applicant_incomes.${index}.address`)} placeholder="Address" className="rounded border-slate-200" />
                            <input {...register(`applicant_incomes.${index}.phone`)} placeholder="Phone" className="rounded border-slate-200" />
                            <input {...register(`applicant_incomes.${index}.position`)} placeholder="Position" className="rounded border-slate-200" />
                            <input {...register(`applicant_incomes.${index}.gross_monthly_income`)} type="number" placeholder="Gross Monthly Income (USD)" className="rounded border-slate-200" />
                            <button
                                className='btn rounded shadow-sm'
                                type="button" onClick={() => removeIncome(index)}>X</button>
                        </div>
                    ))}
                    <button
                        className='btn rounded shadow-sm border-2 border-[#008080] p-3 bg-[#008080] font-bold text-lg'
                        onClick={() => appendIncome({})} type="button">
                        Add Income
                    </button>
                </div>

                <div className='mt-5 mb-5'>
                    <h3>Residence History</h3>
                    <p>List ALL residences for the past 2 years, if applicable. Start with present.</p>
                    {residenceFields.map((field, index) => (
                        <div key={field.id}>
                            <input {...register(`residence_history.${index}.street_address_apartment`)} placeholder="Street Address Apartment" className="rounded border-slate-200" />
                            <input {...register(`residence_history.${index}.city`)} placeholder="City" className="rounded border-slate-200" />
                            <input {...register(`residence_history.${index}.state`)} placeholder="State" className="rounded border-slate-200" />
                            <input {...register(`residence_history.${index}.zip`)} type="number" placeholder="ZIP" className="rounded border-slate-200" />
                            <input {...register(`residence_history.${index}.entry_date`)} type="date" placeholder="Entry Date" className="rounded border-slate-200" />
                            <input {...register(`residence_history.${index}.exit_date`)} type="date" placeholder="Exit Date" className="rounded border-slate-200" />
                            <input {...register(`residence_history.${index}.rent`)} type="number" placeholder="Rent (USD)" className="rounded border-slate-200" />
                            <input {...register(`residence_history.${index}.landlord_name`)} placeholder="Landlord Name" className="rounded border-slate-200" />
                            <input {...register(`residence_history.${index}.landlord_phone`)} placeholder="Landlord Phone" className="rounded border-slate-200" />
                            <button
                                className='btn rounded shadow-sm'
                                type="button" onClick={() => removeResidence(index)}>X</button>
                        </div>
                    ))}
                    <button
                        className='btn rounded shadow-sm border-2 border-[#008080] p-3 bg-[#008080] font-bold text-lg'
                        onClick={() => appendResidence({})} type="button">
                        Add Residence
                    </button>
                </div>

                <div className='mt-5 mb-5'>
                    <h3>Animals Information</h3>
                    <p>Assistance animals are not considered pets but do require written approval of managment and must be listed here.</p>
                    {animalsFields.map((field, index) => (
                        <div key={field.id}>
                            <input {...register(`animals_information.${index}.type_of_animal`)} placeholder="Type of Animal" className="rounded border-slate-200" />
                            <input {...register(`animals_information.${index}.breed`)} placeholder="Breed" className="rounded border-slate-200" />
                            <input {...register(`animals_information.${index}.name`)} placeholder="Name" className="rounded border-slate-200" />
                            <input {...register(`animals_information.${index}.color`)} placeholder="Color" className="rounded border-slate-200" />
                            <input {...register(`animals_information.${index}.age`)} type="number" placeholder="Age" className="rounded border-slate-200" />
                            <input {...register(`animals_information.${index}.weight`)} type="number" placeholder="Weight" className="rounded border-slate-200" />
                            <button
                                className='btn rounded shadow-sm'
                                type="button" onClick={() => removeAnimal(index)}>X</button>
                        </div>
                    ))}
                    <button
                        className='btn rounded shadow-sm border-2 border-[#008080] p-3 bg-[#008080] font-bold text-lg'
                        onClick={() => appendAnimal({})} type="button">
                        Add Animal
                    </button>
                </div>

                <div className='mt-5 mb-5'>
                    <h3>Emergency Contact</h3>
                    {emergencyFields.map((field, index) => (
                        <div key={field.id}>
                            <input {...register(`emergency_contact.${index}.full_name`)} placeholder="Full Name" className="rounded border-slate-200" />
                            <input {...register(`emergency_contact.${index}.relationship`)} placeholder="Relationship" className="rounded border-slate-200" />
                            <input {...register(`emergency_contact.${index}.address`)} placeholder="Address" className="rounded border-slate-200" />
                            <input {...register(`emergency_contact.${index}.phone`)} placeholder="Phone" className="rounded border-slate-200" />
                            <input {...register(`emergency_contact.${index}.email`)} placeholder="Email" className="rounded border-slate-200" />
                            <button
                                className='btn rounded shadow-sm'
                                type="button" onClick={() => removeEmergency(index)}>X</button>
                        </div>
                    ))}
                    <button
                        className='btn rounded shadow-sm border-2 border-[#008080] p-3 bg-[#008080] font-bold text-lg'
                        onClick={() => appendEmergency({})} type="button">
                        Add Emergency Contact
                    </button>
                </div>

                <div className='mt-5 mb-5'>
                    <h3>Vehicles</h3>
                    {vehiclesFields.map((field, index) => (
                        <div key={field.id}>
                            <input {...register(`vehicles.${index}.make`)} placeholder="Make" className="rounded border-slate-200" />
                            <input {...register(`vehicles.${index}.model`)} placeholder="Model" className="rounded border-slate-200" />
                            <input {...register(`vehicles.${index}.year`)} type="number" placeholder="Year" className="rounded border-slate-200" />
                            <input {...register(`vehicles.${index}.license_number`)} placeholder="License Number" className="rounded border-slate-200" />
                            <input {...register(`vehicles.${index}.insurance_company`)} placeholder="Insurance Company" className="rounded border-slate-200" s />
                            <button
                                className='btn rounded shadow-sm'
                                type="button" onClick={() => removeVehicle(index)}>X</button>
                        </div>
                    ))}

                    <button
                        className='btn rounded shadow-sm border-2 border-[#008080] p-3 bg-[#008080] font-bold text-lg'
                        onClick={() => appendVehicle({})} type="button">
                        Add Vehicle
                    </button>
                </div>
                <div style={{ textAlign: "left" }}>
                    <br />
                    <p>Answering yes to the below question will result in an automatic denial:</p>
                    <input {...register('sex_offender_registry')} type="checkbox" className="rounded border-slate-200" /> Are you currently registered or being considered for registration on any sex offender registry?
                    <br />
                    <br />
                    <p>Answering yes to the below questions may adversely affect your application. However, you have the opportunity to provide additional information regarding the issues in the space provided:  </p>
                    <input {...register('convicted_sex_crime')} type="checkbox" className="rounded border-slate-200" /> Have you or any person anticipated to occupy the premises ever been convicted in any sex related crime?
                    <br />
                    <input {...register('sex_offender_list')} type="checkbox" className="rounded border-slate-200" /> Are you or any person anticipated to occupy the premises now or have ever been listed on any sex offender list?
                    <br />
                    <input {...register('anytype_criminal_offense')} type="checkbox" className="rounded border-slate-200" /> Do you or any person anticipated to occupy the premises have any pending case or action relating to any type of criminal offense?
                    <br />
                    <input {...register('outstanding_warrants')} type="checkbox" className="rounded border-slate-200" /> Do you or any person anticipated to occupy the premises have any outstanding warrants?
                    <br />
                    <input {...register('ilicit_drugs')} type="checkbox" className="rounded border-slate-200" /> Have you ever possessed, sold, or used illicit drugs or narcotics in or about your residence?
                    <br />
                    <input {...register('convicted_any_criminal_offense')} type="checkbox" className="rounded border-slate-200" /> Have you or any person anticipated to occupy the premises ever been convicted of any criminal offense (misdemeanor or felony)?
                    <br />
                    <input {...register('plea_aggrement')} type="checkbox" className="rounded border-slate-200" /> Have you or any person anticipated to occupy the premises ever been part of a plea agreement relating to any criminal activity?
                    <br />
                    <input {...register('criminal_record_not_disclosed')} type="checkbox" className="rounded border-slate-200" /> Have you or any person anticipated to occupy the premises have any criminal record not previously disclosed above?
                    <br />
                    <input {...register('evicted_or_failed_rent')} type="checkbox" className="rounded border-slate-200" /> Have you been evicted or failed to pay rent for any reason in the past 7 years?
                    <br />
                    <input {...register('filled_for_bankrupcy')} type="checkbox" className="rounded border-slate-200" /> Have you filed for bankruptcy in the past 7 years?
                    <br />
                    <input {...register('bankrupcy_discharged')} type="checkbox" className="rounded border-slate-200" /> Was the bankruptcy discharged?
                    <br />
                    <input {...register('civil_judgment')} type="checkbox" className="rounded border-slate-200" /> Has a civil judgment been entered against you for the collection of a debt in the past 7 years?
                    <br />
                    <input {...register('animals_in_apartment')} type="checkbox" className="rounded border-slate-200" /> Do you have or intend to have any animals in the apartment home?
                    <br />
                    <input {...register('water_filled_furniture')} type="checkbox" className="rounded border-slate-200" /> Do you have or intend to have water filled furniture in the apartment home?
                    <br />
                    <textarea {...register('detailed_information')} className='mt-3 mb-3 rounded border-slate-200' placeholder='If you answered "yes" to any of the above questions it may adversely affect your application. However, you have the opportunity to provide additional information regarding the issues. Please provide detailed information to assist in the review for any "yes" answer.' style={{ width: "100%" }} />
                    <br />
                    <label className='mr-5 mb-3' htmlFor="how_you_know_us" >How did you hear of our community?</label>
                    <input {...register('how_you_know_us')} id="how_you_know_us" className='rounded border-slate-200' />
                    <br />
                    <label className='mr-5'>How long do you expect to stay?</label>
                    <input {...register('expect_to_stay')} className='rounded border-slate-200' />


                    <p className='mt-5'>
                        KEEPING OF ANIMAL/PET REQUIRES CONSENT OF MANAGEMENT, PAYMENT OF APPLICABLE FEES/DEPOSITS, AND EXECUTION OF PET ADDENDUM.
                        ASSISTANCE ANIMALS USED FOR DISABILITIES ARE NOT CONSIDERED PETS.
                    </p>
                    <p>
                        The Civil Rights Act of 1968, as amended by the Fair Housing Amendments Act of 1988, and all applicable Federal,
                        State and Local Fair Housing laws, prohibits discrimination in the rental of housing based on race, color, religion,
                        national origin, familial status, disability, marital status, age, ancestry, sexual orientation, medical condition,
                        source of income, gender, gender identity, gender expression genetic information, citizenship, immigration status,
                        primary language spoken, or any arbitrary basis. The Federal Agency, which administers compliance with this law,
                        is the U.S. Department c Housing and Urban Development.
                    </p>
                    <p>
                        This is to inform you that as part of our procedure for processing your application, an Investigative Consumer
                        Report may be prepared whereby information obtained through personal interviews with your landlord, employer, or
                        others with whom you are acquainted. This inquiry includes information as to your character, general reputation,
                        personal characteristics, mode of living and credit reps You have the right to make a written request within a
                        reasonable period of time to receive additional detailed information about the nature and scope of this
                        investigation (Fair Credit Reporting Act). I/We hereby agree, in the event of the approval of this application,
                        to execute a lease in accordance with the terms set forth in this rental application and my/our rental liability
                        shall comme pursuant to the terms of the lease. That if I/We fail to sign the lease and/or pay agreed rental,
                        security deposit, utility fees, or other required charges as shown in this rental application the holdingl
                        accompanying this application shall be retained by landlord as liquidated damages and I/We agree to landlord
                        retraining as a reasonable estimate of actual damages to landlord if I/We fail to perform stated above after
                        approval, I/We understand that the holding fees accompanying this application are non-refundable after 72 hours
                        of acceptance of application. The holding fee is refundable application is denied. Owner and/or agent for the owner
                        reserves the right to reject this application and to refuse possession of the above-mentioned accommodation.
                        I/We have read the foreg certify that the information herein is TRUE and CORRECT, that this application is submitted for the purpose of inducing approval of this application in my/our behalf. Any "yes" or "no" que unanswered shall be considered a "yes".
                    </p>
                </div>




                <button
                    className='btn rounded shadow-sm border-2 border-[#008080] p-3 bg-[#008080] font-bold text-lg'
                    type="submit">
                    Submit Request
                </button>
            </form>
        </div>
    );
}

export default NewUserForm;
