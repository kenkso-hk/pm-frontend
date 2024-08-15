import React from 'react';
import { Link } from 'react-router-dom';
import Kitchen from '../images/kitchen.png';
import MNDLogo from '../images/MNDLogo.png';

import { useForm, useFieldArray } from 'react-hook-form';
import NewUserForm from './component/newUserForm';

function Onboarding02() {
  return (
    <main className="bg-white dark:bg-slate-900">

      <div className="relative flex">

        {/* Content */}
        {/* <div className="w-full md:w-1/2"> */}
        <div className="w-full md:full">

          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1 items-center">

            <div className="flex-1">

              {/* Header */}
              <div className="flex px-4 sm:px-6 lg:px-8 gap-5">
                <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" to="/signup">Sign Up</Link>
                <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" to="/signin">Log In</Link>

              </div>


            </div>



            <div className="px-4 py-3 relative text-center">
              <h1 className='font-bold text-6xl text-gray-700 text-center'>APPLICATION & OFFER TO RENT/LEASE REAL PROPERTY</h1>

              <NewUserForm />
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

export default Onboarding02;