import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from 'react-hook-form';
import EmailInput from "../../components/inputs/EmailInput";
import PhoneInput from "../../components/inputs/PhoneInput";


function ResidenceHistory() {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rental_history"
  });

  return (
    <div className="px-5 pt-3 text-base font-medium flex flex-col">
      <h2 className="text-xl font-bold mr-auto uppercase text-slate-900 mb-3">Rental History</h2>
      <label className="">List ALL residences for the past 2 years, if applicable. Start with present.</label>

      <div className="rounded py-3">

        <button
          className='bg-[#0000FF] text-white h-10 rounded mb-3 py-2 px-4'
          onClick={() => append({})} type="button">
          Add Residence
        </button>

        <table className='table w-full text-left'>
          <thead className=''>
            <tr>
              <th className='p-3 w-2/12 text-white bg-black'>Street Address Apartment</th>
              <th className='p-3 w-2/12 text-white bg-black'>City</th>
              <th className='p-3 w-1/12 text-white bg-black'>State</th>
              <th className='p-3 w-1/12 text-white bg-black'>ZIP</th>
              <th className='p-3 w-1/12 text-white bg-black'>Entry Date</th>
              <th className='p-3 w-1/12 text-white bg-black'>Exit Date</th>
              <th className='p-3 w-1/12 text-white bg-black'>Rent (USD)</th>
              <th className='p-3 w-1/12 text-white bg-black'>Landlord Name</th>
              <th className='p-3 w-1/12 text-white bg-black'>Landlord Phone</th>
              <th className='p-3 w-1/12 text-white bg-black'>Landlord Email</th>
              <th className='p-3 w-1/12 text-white bg-black'></th>
            </tr>
          </thead>

          {fields.map((field, index) => (
            <tbody key={field.id}>
              <tr>
                <td className='p-3 align-middle'><input {...register(`rental_history.${index}.street_address_apartment`)} placeholder="Street Address Apartment" className="rounded border-slate-300 w-full" required /></td>
                <td className='p-3 align-middle'><input {...register(`rental_history.${index}.city`)} placeholder="City" className="rounded border-slate-300 w-full" required /></td>
                <td className='p-3 align-middle'><input {...register(`rental_history.${index}.state`)} placeholder="State" className="rounded border-slate-300 w-full" required /></td>
                <td className='p-3 align-middle'><input {...register(`rental_history.${index}.zip`)} type="number" placeholder="ZIP" className="rounded border-slate-300 w-full" required /></td>
                <td className='p-3 align-middle'><input {...register(`rental_history.${index}.entry_date`)} type="date" placeholder="Entry Date" className="rounded border-slate-300 w-full" required /></td>
                <td className='p-3 align-middle'><input {...register(`rental_history.${index}.exit_date`)} type="date" placeholder="Exit Date" className="rounded border-slate-300 w-full" required /></td>
                <td className='p-3 align-middle'><input {...register(`rental_history.${index}.rent`)} type="number" placeholder="Rent (USD)" className="rounded border-slate-300 w-full" required /></td>
                <td className='p-3 align-middle'><input {...register(`rental_history.${index}.landlord_name`)} placeholder="Landlord Name" className="rounded border-slate-300 w-full" required /></td>
                <td className='p-3 align-middle'><PhoneInput name={`rental_history.${index}.landlord_phone`} placeholder="Landlord Phone" readOnly={false} required={true} /></td>
                <td className='p-3 align-middle'><EmailInput name={`rental_history.${index}.landlord_email`} placeholder="Landlord Email" readOnly={false} required={true} /></td>
                <td className='p-3 align-middle'><button
                  className='bg-slate-600 text-black w-full h-10 rounded'
                  type="button" onClick={() => remove(index)}>Remove</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default ResidenceHistory;
