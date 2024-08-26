import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useApplication from '../../hooks/useApplication';

function ApplicationsTableItem(props) {
  const { applicationToEdit, isApplicationModalOpen, openApplicationModal, closeApplicationModal } = useApplication();

  const editApplication = () => {
    openApplicationModal(props.application);
  }
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input id={props.id} className="form-checkbox" type="checkbox" onChange={props.handleClick} checked={props.isChecked} />
          </label>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="font-medium text-slate-800 dark:text-slate-100">{props.application?.user?.given_name + " " + props.application?.user?.family_name}</div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{
          (new Date(props.application?.registration_date)).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.application?.complex.name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.application?.complex.address}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-sky-500">{props.application?.status}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        {/* Send survey button */}
        <button className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full" onClick={()=>editApplication()}>
          Details
        </button>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        {/* Send survey button */}
        <NavLink
          to={"/survey/" + props.id}
          className="block text-slate-200 truncate transition duration-150"
        >
          <button className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full">
            Send survey
          </button>
        </NavLink>
      </td>
    </tr>
  );
}

export default ApplicationsTableItem;
