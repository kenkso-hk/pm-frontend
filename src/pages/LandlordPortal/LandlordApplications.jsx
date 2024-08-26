import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";

import swal from 'sweetalert2';

import SidebarLandlord from '../../partials/SidebarLandlord';
import Header from '../../partials/Header';
import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import MyApplicationsTable from '../../partials/landlordApplications/MyApplicationsTable';
import PaginationClassic from '../../components/PaginationClassic';
import Api from '../../utils/api';
import { requestSuccess, validEmail } from '../../utils/Utils';
import useLoading from '../../hooks/useLoading';
import FilterSelect from '../../components/FilterSelect';
import ModalCreateEditApplicationLandlord from '../../components/modals/ModalCreateEditApplicationLandlord';

function LandlordApplications() {
  const [searchParams] = useSearchParams();
  const { startLoading, stopLoading } = useLoading();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [state, setState] = useState({
    applications: []
  });

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  useEffect((() => {
    getApplicationsAPI();
  }), [searchParams]);

  useEffect((() => {
    getComplexesAPI();
  }), []);



  const getApplicationsAPI = async () => {
    try {
      startLoading();
      var res;
      if(searchParams.get("complex")){
        res = await Api.application.list('?complex='+searchParams.get("complex"));
      }else{
        res = await Api.application.list();
      }
      
      console.log(res);

      if (await requestSuccess(res)) {
        var data = await res.json();
        console.log(data);
        const applications = data.applications;
        console.log(applications);
        if (applications.length === 0) {
          
          if(searchParams.get("complex")){
            await swal.fire("Info", "This complex does not have applications, try removing filters", "info");
          }else{
            await swal.fire("Info", "You don't have applications yet", "info");
          }
          
        }
        setState((prevState) => ({
          ...prevState,
          applications
        }));
      } else {
        stopLoading();
        await swal.fire("¡Ups!", "Error getting applications", "error");
      }
    } catch (e) {
      console.log(e);
      stopLoading();
      await swal.fire("¡Ups!", "Error getting applications", "error");
    }
    //recaptchaRef.current.reset();
    stopLoading();
  };

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
          stopLoading();
          await swal.fire("Info", "You don't have complexes yet", "info");
        }
        setState((prevState) => ({
          ...prevState,
          complexes
        }));
      } else {
        stopLoading();
        await swal.fire("¡Ups!", "Error getting complexes", "error");
      }
    } catch (e) {
      console.log(e);
      stopLoading();
      await swal.fire("¡Ups!", "Error getting complexes", "error");
    }
    //recaptchaRef.current.reset();
    
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

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">My Applications ✨</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                {/* Delete button */}
                <DeleteButton selectedItems={selectedItems} />

                {/* Dropdown */}
                <FilterSelect options={state.complexes} name="complex" initialValue={searchParams.get("complex")}/>
                <DateSelect />

                {/* Filter button */}
                <FilterButton align="right" />

                {/* Add customer button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-black background-gray">
                  <span className="hidden xs:block ml-2">New Application</span>
                </button>

              </div>

            </div>

            <ModalCreateEditApplicationLandlord title="View application" getApplicationsAPI={getApplicationsAPI}/>

            {/* Table */}
            <MyApplicationsTable selectedItems={handleSelectedItems} applications={state.applications} />

            {/* Pagination */}
            <div className="mt-8">
              <PaginationClassic />
            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default LandlordApplications;