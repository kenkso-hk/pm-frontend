import React, { useState, useEffect } from 'react';

import swal from 'sweetalert2';

import SidebarLandlord from '../../partials/SidebarLandlord';
import Header from '../../partials/Header';
import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import MyComplexTable from '../../partials/landlordComplexes/MyCompexTable';
import PaginationClassic from '../../components/PaginationClassic';
import ModalBasic from '../../components/ModalBasic';
import Api from '../../utils/api';
import { requestSuccess, validEmail } from '../../utils/Utils';
import useLoading from '../../hooks/useLoading';
import useComplex from '../../hooks/useComplex';
import ModalCreateEditComplex from '../../components/modals/ModalCreateEditComplex';

function MyComplexes() {
  const { openComplexModal } = useComplex();
  const { startLoading, stopLoading } = useLoading();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [state, setState] = useState({
    complexes: []
  });

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

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

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">My Complexes ✨</h1>
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
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" style={{ backgroundColor: "gray" }} onClick={(e) => { e.stopPropagation(); openComplexModal({}); }}>
                  <span className="hidden xs:block ml-2" >New Complex</span>
                </button>
                <ModalCreateEditComplex title="Create complex" getComplexesAPI={getComplexesAPI}/>
                

              </div>

            </div>

            {/* Table */}
            <MyComplexTable selectedItems={handleSelectedItems} complexes={state.complexes} />

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

export default MyComplexes;