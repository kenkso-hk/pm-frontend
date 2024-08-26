import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from 'react-hook-form';

function Vehicles() {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "vehicles"
  });

  return (
    <div className="px-5 pt-3 text-base font-medium flex flex-col">
      <h2 className="text-xl font-bold mr-auto uppercase text-slate-900">Vehicles</h2>

      <div className="rounded py-3">
        <button
          className='bg-[#0000FF] text-white h-10 rounded mb-3 py-2 px-4'
          onClick={() => append({})} type="button">
          Add Vehicle
        </button>
        <table className='table w-full text-left'>
          <thead className="bg-gray-500 text-white">
            <tr>
              <th className='p-3 w-2/12 bg-black text-white'>Make</th>
              <th className='p-3 w-2/12 bg-black text-white'>Model</th>
              <th className='p-3 w-2/12 bg-black text-white'>Year</th>
              <th className='p-3 w-2/12 bg-black text-white'>License Number</th>
              <th className='p-3 w-3/12 bg-black text-white'>Insurance Company</th>
              <th className='p-3 w-1/12 bg-black text-white'></th>
            </tr>
          </thead>
          {fields.map((field, index) => (
            <tbody key={field.id}>
              <tr>
                <td className='p-3 align-middle'><input {...register(`vehicles.${index}.make`)} placeholder="Make" className="rounded border-slate-300 w-full" required/></td>
                <td className='p-3 align-middle'><input {...register(`vehicles.${index}.model`)} placeholder="Model" className="rounded border-slate-300 w-full" required/></td>
                <td className='p-3 align-middle'><input {...register(`vehicles.${index}.year`)} type="number" placeholder="Year" className="rounded border-slate-300 w-full" required/></td>
                <td className='p-3 align-middle'><input {...register(`vehicles.${index}.license_number`)} placeholder="License Number" className="rounded border-slate-300 w-full" required/></td>
                <td className='p-3 align-middle'><input {...register(`vehicles.${index}.insurance_company`)} placeholder="Insurance Company" className="rounded border-slate-300 w-full" required/></td>
                <td className='p-3 align-middle'><button
                  className='bg-slate-600 text-black w-full h-10 rounded'
                  type="button" onClick={() => remove(index)}>Remove</button></td>
              </tr>
            </tbody>
          ))}

        </table>
      </div>
    </div>
  );
}

export default Vehicles;
