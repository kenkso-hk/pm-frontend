import React, { useEffect } from "react";
import { useForm, useFieldArray } from 'react-hook-form';

function EmergencyContact({onUpdate}) {
  const childName = "emergency_contact";
  const { register, control, watch } = useForm();

  const { fields: emergencyFields, append: appendEmergency, remove: removeEmergency } = useFieldArray({
    control,
    name: childName
  });

  const emergency_contact = watch(childName);

  useEffect(() => {
    onUpdate(emergency_contact, childName);
  }, [emergency_contact, childName]);

  const handleChange = () => {
    onUpdate(emergency_contact, childName);
  }

  return (
    <div className="px-5 pt-3 text-base font-medium flex flex-col">
      <h2 className="text-xl font-bold mr-auto uppercase text-slate-900">Emergency Contact</h2>

      <div className="rounded py-3">
      <button
            className='bg-[#0000FF] text-white h-10 rounded mb-3 py-2 px-4'
            onClick={() => appendEmergency({})} type="button">
            Add Emergency Contact
          </button>

        <table className='table w-full text-left'>
          <thead className=''>
            <tr>
              <th className='p-3 w-2/12 text-white bg-black'>Full Name</th>
              <th className='p-3 w-2/12 text-white bg-black'>Relationship</th>
              <th className='p-3 w-2/12 text-white bg-black'>Address</th>
              <th className='p-3 w-2/12 text-white bg-black'>Phone</th>
              <th className='p-3 w-3/12 text-white bg-black'>Email</th>
              <th className='p-3 w-1/12 text-white bg-black'></th>
            </tr>
          </thead>

          {emergencyFields.map((field, index) => (
            <tbody key={field.id}>
              <tr>
              <td className='p-3 align-middle'><input {...register(`emergency_contact.${index}.full_name`)} onChange={handleChange} placeholder="Full Name" className="rounded border-slate-300 w-full" /></td>
              <td className='p-3 align-middle'><input {...register(`emergency_contact.${index}.relationship`)} onChange={handleChange} placeholder="Relationship" className="rounded border-slate-300 w-full" /></td>
              <td className='p-3 align-middle'><input {...register(`emergency_contact.${index}.address`)} onChange={handleChange} placeholder="Address" className="rounded border-slate-300 w-full" /></td>
              <td className='p-3 align-middle'><input {...register(`emergency_contact.${index}.phone`)} onChange={handleChange} placeholder="Phone" className="rounded border-slate-300 w-full" /></td>
              <td className='p-3 align-middle'><input {...register(`emergency_contact.${index}.email`)} onChange={handleChange} placeholder="Email" className="rounded border-slate-300 w-full" /></td>
              <td className='p-3 align-middle'><button
                  className='bg-slate-600 text-black w-full h-10 rounded'
                  type="button" onClick={() => removeEmergency(index)}>Remove</button>
                  </td>
              </tr>
            </tbody>
          ))}
          

          

        </table>
      </div>
    </div>
  );
}

export default EmergencyContact;
