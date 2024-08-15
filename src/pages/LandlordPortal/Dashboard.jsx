import React, { useState, useEffect } from 'react';

import SidebarLandlord from '../../partials/SidebarLandlord';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../../partials/dashboard/DashboardAvatars';
import FilterButton from '../../components/DropdownFilter';
import Datepicker from '../../components/Datepicker';
import DashboardCard01 from '../../partials/dashboard/DashboardCardComplex';
import Api from '../../utils/api';
import { requestSuccess } from '../../utils/Utils';
import useLoading from '../../hooks/useLoading';


function Dashboard() {
  const { startLoading, stopLoading } = useLoading();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [state, setState] = useState({
    complexes: []
  });

  useEffect((() => {
    getComplexesAPI();
  }), [])

  const getComplexesAPI = async () => {
    try {
      const JWT = localStorage.getItem("JWT");
      startLoading();
      var res = await Api.complex.list();
      console.log(res);

      if (await requestSuccess(res)) {
        var data = await res.json();
        console.log(data);
        const complexes = data.complex;
        console.log(complexes);
        if (complexes.length === 0) {
          await swal.fire("Info", "You don't have complexes yet", "info");
        }
        setState((prevState) => ({
          ...prevState,
          complexes
        }));
      } else {
        await swal.fire("¡Ups!", "Error getting complexes", "error");
      }
    } catch (e) {
      console.log(e);
      await swal.fire("¡Ups!", "Error getting complexes", "error");
    }
    //recaptchaRef.current.reset();
    stopLoading();
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <SidebarLandlord sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}
              <DashboardAvatars />

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton align="right" />
                {/* Datepicker built with flatpickr */}
                <Datepicker align="right" />
                {/* Add view button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" style={{ backgroundColor: "gray" }}>
                  <span className="hidden xs:block ml-2" >New Complex</span>
                </button>
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {state.complexes.map((complex, index) => (
                  <DashboardCard01 complex={complex} key={index} />
              ))}

            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default Dashboard;