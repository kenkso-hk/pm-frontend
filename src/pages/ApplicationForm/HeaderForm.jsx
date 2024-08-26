import React from "react";

function HeaderForm({ complex }) {
  return (
    <div className="w-full bg-gray-500 text-slate-100 rounded px-3 pt-3 pb-2">
      <div className="mb-0">
        <h1 className="text-2xl md:text-3xl text-slate-100 dark:text-slate-800 font-bold uppercase">
          Application & Offer To Rent/Lease Real Property
        </h1>
        <h1 className="text-2xl md:text-3xl text-slate-100 dark:text-slate-800 font-bold uppercase">{complex?.name + " - " + complex?.address || ""}
        </h1>

      </div>
    </div>);
}

export default HeaderForm;