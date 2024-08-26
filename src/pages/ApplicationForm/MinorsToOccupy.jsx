import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from 'react-hook-form';
import EmailInput from "../../components/inputs/EmailInput";

function MinorsToOccupy() {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "minors_to_ocuppy"
  });

  return (
    <div className="px-5 pt-3 text-base font-medium flex flex-col">
      <h2 className="text-xl font-bold mr-auto uppercase text-slate-900">Minors To Occupy</h2>


      <div className="rounded py-3">

        <button
          className='bg-[#0000FF] text-white h-10 rounded mb-3 py-2 px-4'
          onClick={() => append({})} type="button">
          Add Minor
        </button>

        <table className='table w-full text-left'>

          <thead>
            <tr className="">
              <th className='p-3 w-3/12 bg-black text-white'>Full Name</th>
              <th className='p-3 w-3/12 bg-black text-white'>Relationship</th>
              <th className='p-3 w-3/12 bg-black text-white'>Age</th>
              <th className='p-3 w-2/12 bg-black text-white'>Birth Date</th>
              <th className='p-3 w-1/12 bg-black text-white'></th>
            </tr>
          </thead>

          {fields.map((field, index) => (
            <tbody key={field.id}>
              <tr>
                <td className='p-3 align-middle'><input {...register(`minors_to_ocuppy.${index}.full_name`)} placeholder="Full Name" className="w-full rounded border-slate-300" required/></td>
                <td className='p-3 align-middle'><input {...register(`minors_to_ocuppy.${index}.relationship`)} placeholder="Relationship" className="w-full rounded border-slate-300" required/></td>
                <td className='p-3 align-middle'><input {...register(`minors_to_ocuppy.${index}.age`)}  type="number" placeholder="Age" className="w-full rounded border-slate-300" required/></td>
                <td className='p-3 align-middle'><input {...register(`minors_to_ocuppy.${index}.birth_date`)}  type="date" placeholder="Birth Date" className="w-full rounded border-slate-300" required/></td>
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

export default MinorsToOccupy;
