import React, { useEffect } from "react";
import { useForm, useFieldArray } from 'react-hook-form';

function ApplicantIncomes({onUpdate}) {
  const childName = "applicant_incomes";
  const { register, control, watch } = useForm();

  const { fields: incomesFields, append: appendIncome, remove: removeIncome } = useFieldArray({
    control,
    name: childName
  });

  const applicant_incomes = watch(childName);

  useEffect(() => {
    onUpdate(applicant_incomes, childName);
  }, [applicant_incomes, childName]);

  const handleChange = () => {
    onUpdate(applicant_incomes, childName);
  }

  return (
    <div className="px-5 pt-3 text-base font-medium flex flex-col">
      <h2 className="text-xl font-bold mr-auto uppercase text-slate-900">Applicant Incomes</h2>



      <div className="rounded py-3">

        <button
          className='bg-[#0000FF] text-white h-10 rounded mb-3 py-2 px-4'
          onClick={() => appendIncome({})} type="button">
          Add Income
        </button>

        <table className='table w-full text-left'>
          <thead className=''>
            <tr>
              <th className='p-3 w-3/12 text-white bg-black'>Company Name</th>
              <th className='p-3 w-2/12 text-white bg-black'>Address</th>
              <th className='p-3 w-2/12 text-white bg-black'>Phone</th>
              <th className='p-3 w-2/12 text-white bg-black'>Position</th>
              <th className='p-3 w-2/12 text-white bg-black'>Gross Monthly Income (USD)</th>
              <th className='p-3 w-1/12 text-white bg-black'></th>
            </tr>
          </thead>

          {incomesFields.map((field, index) => (
            <tbody key={field.id}>
              <tr>
                <td className='p-3 align-middle'><input {...register(`applicant_incomes.${index}.company_name`)} onChange={handleChange} placeholder="Company Name" className="w-full rounded border-slate-300" /></td>
                <td className='p-3 align-middle'><input {...register(`applicant_incomes.${index}.address`)} onChange={handleChange} placeholder="Address" className="w-full rounded border-slate-300" /></td>
                <td className='p-3 align-middle'><input {...register(`applicant_incomes.${index}.phone`)} onChange={handleChange} placeholder="Phone" className="w-full rounded border-slate-300" /></td>
                <td className='p-3 align-middle'><input {...register(`applicant_incomes.${index}.position`)} onChange={handleChange} placeholder="Position" className="w-full rounded border-slate-300" /></td>
                <td className='p-3 align-middle'><input {...register(`applicant_incomes.${index}.gross_monthly_income`)} type="number" onChange={handleChange} placeholder="Gross Monthly Income (USD)" className="w-full rounded border-slate-300" /></td>
                <td className='p-3 align-middle'><button
                  className='bg-slate-600 text-black w-full h-10 rounded'
                  type="button" onClick={() => removeIncome(index)}>Remove</button>
                </td>
              </tr>
            </tbody>
          ))}





        </table>
      </div>
    </div>
  );
}

export default ApplicantIncomes;
