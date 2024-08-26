import React, { useState, useEffect } from 'react';
import swal from 'sweetalert2';
import ModalBasic from '../ModalBasic';
import useLoading from '../../hooks/useLoading';
import useApplication from '../../hooks/useApplication';
import Api from '../../utils/api';
import { requestSuccess } from '../../utils/Utils';
import { Link, NavLink } from 'react-router-dom';

function ModalCreateEditApplicationRenter(props) {
    const { startLoading, stopLoading } = useLoading();
    const { applicationToEdit, isApplicationModalOpen, openApplicationModal, closeApplicationModal } = useApplication();
    const [state, setState] = useState({
        application: {
            complex: null,
            status: "New",
            feedback: ""
        },
        complexes: []
    });

    const getComplexesAPI = async () => {
        try {
            startLoading();
            var res = await Api.complex.list();

            console.log(res);


            if (await requestSuccess(res)) {
                var data = await res.json();
                console.log(data);
                setState((prevState) => ({
                    ...prevState,
                    complexes: data.complex
                }));

            } else {
                await swal.fire("Ups!", "Error getting complexes", "error");
            }
        } catch (e) {
            console.log(e);
            await swal.fire("Ups!", "Error getting complexes", "error");
        }
        stopLoading();
    };

    useEffect((() => {
        console.log(1);
        console.log(applicationToEdit);
        setState((prevState) => ({
            ...prevState,
            application: {
                ...applicationToEdit,
                complex: applicationToEdit.complex?._id
            }
        }))
    }), [applicationToEdit]);

    useEffect((() => {
        getComplexesAPI();
    }), []);


    const handleChange = async (e) => {
        var { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            application: {
                ...prevState.application,
                [id]: value,
            }

        }));
        console.log(state);
    };

    const createApplicationClick = async (e) => {
        try {
            if (e) e.preventDefault();
            //if (!await validateData(data)) return;
            startLoading();
            var res;
            if (applicationToEdit._id) {
                res = await Api.application.update(state.application._id, state.application);
            } else {
                res = await Api.application.create(state.application);
            }

            console.log(res);
            var data = await res.json();
            console.log(data);
            if (await requestSuccess(res)) {
                closeApplicationModal();
                stopLoading();
                await swal.fire("OK!", "Application saved!", "success");
                props.getApplicationsAPI();
            } else {
                stopLoading();
                await swal.fire("Ups!", "Error saving application", "error");
            }
        } catch (e) {
            console.log(e);
            stopLoading();
            await swal.fire("¡Ups!", "Error saving application", "error");
        }
    };

    function setModalOpen(isOpen) {

    }

    return (
        <div>
            <ModalBasic id="feedback-modal" modalOpen={isApplicationModalOpen} setModalOpen={setModalOpen} title={applicationToEdit._id ? "Edit application" : "Create application"}>
                {/* Modal content */}
                <div className="px-5 py-4">
                    {/*<div className="text-sm">
                      <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">Let us know what you think 🙌</div>
                    </div>*/}
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="complex">Complex <span className="text-rose-500">*</span></label>
                            <select id="complex" className="form-input w-full px-2 py-1" type="text" value={state.application.complex} onChange={handleChange} required>
                                <option value={null}>Select an option</option>
                                {state.complexes.map((complex, index) => (
                                    <option value={complex._id} key={index}>{complex.name}, {complex.address}</option>
                                ))}
                            </select>
                        </div>
                        {state.application?.complex && (
                            <Link
                                to={"/application/" + state.application?.complex}
                                className="block text-slate-200 truncate transition duration-150"
                            >
                                <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-black">Continue</button>
                            </Link>
                        )}
                        <div hidden={true}>
                            <label className="block text-sm font-medium mb-1" htmlFor="status">Status <span className="text-rose-500">*</span></label>
                            <select id="status" className="form-input w-full px-2 py-1" value={state.application?.status} onChange={handleChange} disabled={true} required>
                            <option value={null}>Select an option</option>
                                <option value="New">New</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Approved">Approved</option>
                                <option value="Denied">Denied</option>
                                <option value="Cancelled by applicant">Cancelled by applicant</option>
                                
                            </select>
                        </div>
                        <div hidden={true}>
                            <label className="block text-sm font-medium mb-1" htmlFor="email">Feedback <span className="text-rose-500">*</span></label>
                            <input id="feedback" className="form-input w-full px-2 py-1" type="email" value={state.application.feedback || ""} placeholder='The landlord can give you a feedback' onChange={handleChange} disabled={true} />
                        </div>
                    </div>

                </div>
                {/* Modal footer */}
                <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex flex-wrap justify-end space-x-2">
                        <button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={(e) => { e.stopPropagation(); closeApplicationModal(); }}>Cancel</button>
                        <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" hidden={true} onClick={createApplicationClick}>Save</button>
                    </div>
                </div>
            </ModalBasic>
        </div>
    );
}

export default ModalCreateEditApplicationRenter;