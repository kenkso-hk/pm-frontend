import React, { useEffect } from "react";
import { useForm, useFieldArray } from 'react-hook-form';

function Vehicles({onUpdate}) {
  const childName = "vehicles";
  const { register, control, watch } = useForm();

  const { fields: vehiclesFields, append: appendVehicle, remove: removeVehicle } = useFieldArray({
    control,
    name: childName
  });

  const vehicles = watch(childName);

  useEffect(() => {
    onUpdate(vehicles, childName);
  }, [vehicles, childName]);

  const handleChange = () => {
    onUpdate(vehicles, childName);
  }

  return (
    <div className="px-5 pt-3 text-base font-medium flex flex-col">
      <h2 className="text-xl font-bold mr-auto uppercase text-slate-900">Vehicles</h2>

      <div className="rounded py-3">
        <button
          className='bg-[#0000FF] text-white h-10 rounded mb-3 py-2 px-4'
          onClick={() => appendVehicle({})} type="button">
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
          {vehiclesFields.map((field, index) => (
            <tbody key={field.id}>
              <tr>
                <td className='p-3 align-middle'><input {...register(`vehicles.${index}.make`)} onChange={handleChange} placeholder="Make" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`vehicles.${index}.model`)} onChange={handleChange} placeholder="Model" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`vehicles.${index}.year`)} type="number" onChange={handleChange} placeholder="Year" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`vehicles.${index}.license_number`)} onChange={handleChange} placeholder="License Number" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><input {...register(`vehicles.${index}.insurance_company`)} onChange={handleChange} placeholder="Insurance Company" className="rounded border-slate-300 w-full" /></td>
                <td className='p-3 align-middle'><button
                  className='bg-slate-600 text-black w-full h-10 rounded'
                  type="button" onClick={() => removeVehicle(index)}>Remove</button></td>
              </tr>
            </tbody>
          ))}

        </table>
      </div>
    </div>
  );
}

export default Vehicles;
