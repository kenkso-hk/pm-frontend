import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

function Footer() {

  return (
    <div className="px-5 py-2 text-base font-medium">

      <div className="mb-3 text-center"> 
        <button 
        className="bg-[#0000FF] text-white w-20 h-10 rounded"
        type="submit">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Footer;
