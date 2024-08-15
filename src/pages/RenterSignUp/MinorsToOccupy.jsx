import React, { useEffect } from "react";
import { useForm, useFieldArray } from 'react-hook-form';

function MinorsToOccupy({ onUpdate }) {
  const childName = "minors_to_ocuppy";
  const { register, control, watch } = useForm();

  const { fields: minorsFields, append: appendMinor, remove: removeMinor } = useFieldArray({
    control,
    name: childName
  });

  const minors_to_ocuppy = watch(childName);

  useEffect(() => {
    onUpdate(minors_to_ocuppy, childName);
  }, [minors_to_ocuppy, childName]);

  const handleChange = () => {
    onUpdate(minors_to_ocuppy, childName);
  }

  return (
    <div className="px-5 pt-3 text-base font-medium flex flex-col">
      <h2 className="text-xl font-bold mr-auto uppercase text-slate-900">Minors To Occupy</h2>


      <div className="rounded py-3">

        <button
          className='bg-[#0000FF] text-white h-10 rounded mb-3 py-2 px-4'
          onClick={() => appendMinor({})} type="button">
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

          {minorsFields.map((field, index) => (
            <tbody key={field.id}>
              <tr>
                <td className='p-3 align-middle'><input {...register(`minors_to_ocuppy.${index}.full_name`)} onChange={handleChange} placeholder="Full Name" className="w-full rounded border-slate-300" /></td>
                <td className='p-3 align-middle'><input {...register(`minors_to_ocuppy.${index}.relationship`)} onChange={handleChange} placeholder="Relationship" className="w-full rounded border-slate-300" /></td>
                <td className='p-3 align-middle'><input {...register(`minors_to_ocuppy.${index}.age`)} onChange={handleChange} type="number" placeholder="Age" className="w-full rounded border-slate-300" /></td>
                <td className='p-3 align-middle'><input {...register(`minors_to_ocuppy.${index}.birth_date`)} onChange={handleChange} type="date" placeholder="Birth Date" className="w-full rounded border-slate-300" /></td>
                <td className='p-3 align-middle'><button
                  className='bg-slate-600 text-black w-full h-10 rounded'
                  type="button" onClick={() => removeMinor(index)}>Remove</button>
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
