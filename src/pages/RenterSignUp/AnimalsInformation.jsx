import React, { useEffect } from "react";
import { useForm, useFieldArray } from 'react-hook-form';

function AnimalsInformation({onUpdate}) {
  const childName = "animals_information";
  const { register, control, watch } = useForm();

  const { fields: animalsFields, append: appendAnimal, remove: removeAnimal } = useFieldArray({
    control,
    name: childName
  });

  const animals_information = watch(childName);

  useEffect(() => {
    onUpdate(animals_information, childName);
  }, [animals_information, childName]);

  const handleChange = () => {
    onUpdate(animals_information, childName);
  }

  return (
    <div className="px-5 pt-3 text-base font-medium flex flex-col">
      <h2 className="text-xl font-bold mr-auto uppercase text-slate-900">Animals Information</h2>

      <div className="rounded py-3">
        <button
          className='bg-[#0000FF] text-white h-10 rounded mb-3 py-2 px-4'
          onClick={() => appendAnimal({})} type="button">
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
          {animalsFields.map((field, index) => (
            <tbody key={field.id}>
              <tr>
                <td className='p-3 align-middle'><input {...register(`animals_information.${index}.type_of_animal`)} onChange={handleChange} placeholder="Type of Animal" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`animals_information.${index}.breed`)} onChange={handleChange} placeholder="Breed" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`animals_information.${index}.name`)} onChange={handleChange} placeholder="Name" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`animals_information.${index}.color`)} onChange={handleChange} placeholder="Color" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`animals_information.${index}.age`)} type="number" onChange={handleChange} placeholder="Age" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`animals_information.${index}.weight`)} type="number" onChange={handleChange} placeholder="Weight" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><button
                  className='bg-slate-600 text-black w-full h-10 rounded'
                  type="button" onClick={() => removeAnimal(index)}>Remove</button>
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
