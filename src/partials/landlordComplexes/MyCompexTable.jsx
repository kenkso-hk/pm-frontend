import React, { useState, useEffect } from 'react';
import Complex from './ComplexTableItem';

function MyComplexTable(props) {


  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(props.complexes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.complexes]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map(li => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  const editComplex = () =>{
    alert("editComplex");
    props.setComplexModalOpen(true);
  }

  useEffect(() => {
    props.selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">All Complexes <span className="text-slate-400 dark:text-slate-500 font-medium">{list?.length || 0}</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <span className="sr-only">Favourite</span>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Address</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">City</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Date</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Address</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">ZIP</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
              {
                list.map((complex) => {
                  return (
                    <Complex
                      key={complex._id}
                      id={complex._id}
                      complex={complex}
                      handleClick={handleClick}
                      setComplexModalOpen={editComplex}
                      isChecked={isCheck.includes(complex._id)}
                    />
                  )
                })
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default MyComplexTable;
