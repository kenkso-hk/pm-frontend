import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from 'react-hook-form';
import EmailInput from "../../components/inputs/EmailInput";
import PhoneInput from "../../components/inputs/PhoneInput";

function EmergencyContact() {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emergency_contact"
  });

  return (
    <div className="px-5 pt-3 text-base font-medium flex flex-col">
      <h2 className="text-xl font-bold mr-auto uppercase text-slate-900">Emergency Contact</h2>

      <div className="rounded py-3">
        <button
          className='bg-[#0000FF] text-white h-10 rounded mb-3 py-2 px-4'
          onClick={() => append({})} type="button">
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

          {fields.map((field, index) => (
            <tbody key={field.id}>
              <tr>
                <td className='p-3 align-middle'><input {...register(`emergency_contact.${index}.full_name`)} placeholder="Full Name" className="rounded border-slate-300 w-full" required /></td>
                <td className='p-3 align-middle'><input {...register(`emergency_contact.${index}.relationship`)} placeholder="Relationship" className="rounded border-slate-300 w-full" required /></td>
                <td className='p-3 align-middle'><input {...register(`emergency_contact.${index}.address`)} placeholder="Address" className="rounded border-slate-300 w-full" required /></td>
                <td className='p-3 align-middle'><PhoneInput name={`emergency_contact.${index}.phone`} placeholder="Phone" required={true} /></td>
                <td className='p-3 align-middle'><EmailInput name={`emergency_contact.${index}.email`} placeholder="Email" required={true} /></td>
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

export default EmergencyContact;
