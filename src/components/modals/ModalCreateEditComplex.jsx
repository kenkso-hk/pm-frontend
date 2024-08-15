import React, { useState, useEffect } from 'react';
import swal from 'sweetalert2';
import ModalBasic from '../ModalBasic';
import useLoading from '../../hooks/useLoading';
import useComplex from '../../hooks/useComplex';
import Api from '../../utils/api';
import { requestSuccess } from '../../utils/Utils';

function ModalCreateEditComplex(props) {
    const { startLoading, stopLoading } = useLoading();
    const { complexToEdit, isComplexModalOpen, setIsComplexModalOpen, closeComplexModal } = useComplex();
    const [state, setState] = useState({
        complex: {}
    })

    useEffect((()=>{
        setState((prevState)=>({
            ...prevState,
            complex: complexToEdit
        }));
    }),[complexToEdit]);


    const handleChange = async (e) => {
        var { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            complex: {
                ...prevState.complex,
                [id]: value,
            }

        }));
        console.log(state);
    };

    const createComplexClick = async (e) => {
        try {
            if (e) e.preventDefault();
            //if (!await validateData(data)) return;
            startLoading();
            var res;
            if(complexToEdit._id){
                res = await Api.complex.update(state.complex._id, state.complex);
            }else{
                res = await Api.complex.create(state.complex);
            }

            console.log(res);
            var data = await res.json();
            console.log(data);
            if (await requestSuccess(res)) {
                closeComplexModal();
                stopLoading();
                await swal.fire("OK!", "Complex saved!", "success");
                props.getComplexesAPI();
            } else {
                stopLoading();
                await swal.fire("Ups!", "Error saving complex", "error");
            }
        } catch (e) {
            console.log(e);
            stopLoading();
            await swal.fire("¡Ups!", "Error saving complex", "error");
        }
    };

    function setModalOpen(isOpen){

    }

    return (
        <div>
            <ModalBasic id="feedback-modal" modalOpen={isComplexModalOpen} setModalOpen={setModalOpen} title={complexToEdit._id ? "Edit complex" : "Create complex"}>
                {/* Modal content */}
                <div className="px-5 py-4">
                    {/*<div className="text-sm">
                      <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">Let us know what you think 🙌</div>
                    </div>*/}
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="name">Name <span className="text-rose-500">*</span></label>
                            <input id="name" className="form-input w-full px-2 py-1" type="text" value={state.complex.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="email">Address <span className="text-rose-500">*</span></label>
                            <input id="address" className="form-input w-full px-2 py-1" type="email" value={state.complex.address} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="email">City <span className="text-rose-500">*</span></label>
                            <input id="city" className="form-input w-full px-2 py-1" type="email" value={state.complex.city} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="email">State <span className="text-rose-500">*</span></label>
                            <input id="state" className="form-input w-full px-2 py-1" type="email" value={state.complex.state} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="email">ZIP <span className="text-rose-500">*</span></label>
                            <input id="zip" className="form-input w-full px-2 py-1" type="email" value={state.complex.zip} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="feedback">Amenities</label>
                            <textarea id="amenities" className="form-textarea w-full px-2 py-1" rows="4" value={state.complex.amenities} onChange={handleChange} required></textarea>
                        </div>
                    </div>

                </div>
                {/* Modal footer */}
                <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex flex-wrap justify-end space-x-2">
                        <button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={(e) => { e.stopPropagation(); closeComplexModal(); }}>Cancel</button>
                        <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" onClick={createComplexClick}>Save</button>
                    </div>
                </div>
            </ModalBasic>
        </div>
    );
}

export default ModalCreateEditComplex;