import React, { useState, useEffect } from 'react';

import swal from 'sweetalert2';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import MyApplicationsTable from '../../partials/renterApplications/MyApplicationsTable';
import PaginationClassic from '../../components/PaginationClassic';
import Api from '../../utils/api';
import { requestSuccess, validEmail } from '../../utils/Utils';
import ModalCreateEditApplicationRenter from '../../components/modals/ModalCreateEditApplicationRenter';
import useApplication from '../../hooks/useApplication';

function MyApplications() {
  const { openApplicationModal } = useApplication();
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
  }), [])

  const getApplicationsAPI = async () => {
    try {
      console.log(1);
      const JWT = localStorage.getItem("JWT");
      //handleLoading(true);
      var res = await Api.application.list();

      console.log(res);
      var data = await res.json();

      if (await requestSuccess(res)) {
        console.log(data);
        const applications = data.applications;
        console.log(applications);
        if (!applications || applications.length === 0) {
          await swal.fire("Info", "You don't have applications yet", "info");
        }
        setState((prevState) => ({
          ...prevState,
          applications
        }));
      } else {
        await swal.fire("¡Ups!", "Error getting applications", "error");
      }
    } catch (e) {
      console.log(e);
      await swal.fire("¡Ups!", "Error getting applications", "error");
    }
    //recaptchaRef.current.reset();
    //handleLoading(false);
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                <DateSelect />

                {/* Filter button */}
                <FilterButton align="right" />

                {/* Add customer button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" style={{ backgroundColor: "gray" }} onClick={(e) => { e.stopPropagation(); openApplicationModal({}); }}>
                  <span className="hidden xs:block ml-2">New Application</span>
                </button>

              </div>

            </div>

            <ModalCreateEditApplicationRenter title="Create application" getApplicationsAPI={getApplicationsAPI}/>

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

export default MyApplications;