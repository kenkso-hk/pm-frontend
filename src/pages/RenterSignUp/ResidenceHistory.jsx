import React, { useEffect } from "react";
import { useForm, useFieldArray } from 'react-hook-form';


function ResidenceHistory({ onUpdate }) {
  const childName = "residence_history";
  const { register, control, watch } = useForm();

  const { fields: residenceFields, append: appendResidence, remove: removeResidence } = useFieldArray({
    control,
    name: childName
  });

  const residence_history = watch(childName);

  useEffect(() => {
    onUpdate(residence_history, childName);
  }, [residence_history, childName]);

  const handleChange = () => {
    onUpdate(residence_history, childName);
  }

  return (
    <div className="px-5 pt-3 text-base font-medium flex flex-col">
      <h2 className="text-xl font-bold mr-auto uppercase text-slate-900 mb-3">Residence History</h2>
      <label className="">List ALL residences for the past 2 years, if applicable. Start with present.</label>

      <div className="rounded py-3">

        <button
          className='bg-[#0000FF] text-white h-10 rounded mb-3 py-2 px-4'
          onClick={() => appendResidence({})} type="button">
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
              <th className='p-3 w-1/12 text-white bg-black'></th>
            </tr>
          </thead>

          {residenceFields.map((field, index) => (
            <tbody key={field.id}>
              <tr>
                <td className='p-3 align-middle'><input {...register(`residence_history.${index}.street_address_apartment`)} onChange={handleChange} placeholder="Street Address Apartment" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`residence_history.${index}.city`)} onChange={handleChange} placeholder="City" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`residence_history.${index}.state`)} onChange={handleChange} placeholder="State" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`residence_history.${index}.zip`)} onChange={handleChange} type="number" placeholder="ZIP" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`residence_history.${index}.entry_date`)} onChange={handleChange} type="date" placeholder="Entry Date" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`residence_history.${index}.exit_date`)} onChange={handleChange} type="date" placeholder="Exit Date" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`residence_history.${index}.rent`)} onChange={handleChange} type="number" placeholder="Rent (USD)" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`residence_history.${index}.landlord_name`)} onChange={handleChange} placeholder="Landlord Name" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`residence_history.${index}.landlord_phone`)} onChange={handleChange} placeholder="Landlord Phone" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><button
                  className='bg-slate-600 text-black w-full h-10 rounded'
                  type="button" onClick={() => removeResidence(index)}>Remove</button>
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
