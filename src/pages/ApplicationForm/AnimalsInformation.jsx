import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from 'react-hook-form';

function AnimalsInformation() {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "animals_information"
  });

  return (
    <div className="px-5 pt-3 text-base font-medium flex flex-col">
      <h2 className="text-xl font-bold mr-auto uppercase text-slate-900">Animals Information</h2>

      <div className="rounded py-3">
        <button
          className='bg-[#0000FF] text-white h-10 rounded mb-3 py-2 px-4'
          onClick={() => append({})} type="button">
          Add Animal
        </button>

        <table className='table w-full text-left'>
          <thead className=''>
            <tr>
              <th className='p-3 w-2/12 text-white bg-black'>Type of Animal</th>
              <th className='p-3 w-2/12 text-white bg-black'>Breed</th>
              <th className='p-3 w-2/12 text-white bg-black'>Name</th>
              <th className='p-3 w-2/12 text-white bg-black'>Color</th>
              <th className='p-3 w-1/12 text-white bg-black'>Age</th>
              <th className='p-3 w-2/12 text-white bg-black'>Weight</th>
              <th className='p-3 w-1/12 text-white bg-black'></th>
            </tr>
          </thead>
          {fields.map((field, index) => (
            <tbody key={field.id}>
              <tr>
                <td className='p-3 align-middle'><input {...register(`animals_information.${index}.type_of_animal`)} placeholder="Type of Animal" className="rounded border-slate-300 w-full" required/></td>
                <td className='p-3 align-middle'><input {...register(`animals_information.${index}.breed`)} placeholder="Breed" className="rounded border-slate-300 w-full" required/></td>
                <td className='p-3 align-middle'><input {...register(`animals_information.${index}.name`)} placeholder="Name" className="rounded border-slate-300 w-full" required/></td>
                <td className='p-3 align-middle'><input {...register(`animals_information.${index}.color`)} placeholder="Color" className="rounded border-slate-300 w-full" required/></td>
                <td className='p-3 align-middle'><input {...register(`animals_information.${index}.age`)} type="number" placeholder="Age" className="rounded border-slate-300 w-full" required/></td>
                <td className='p-3 align-middle'><input {...register(`animals_information.${index}.weight`)} type="number" placeholder="Weight" className="rounded border-slate-300 w-full" required/></td>
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

export default AnimalsInformation;
