import React from "react";
import { useFormContext } from "react-hook-form";

function EmailInput({ name, required=true, readOnly=false, onChange, placeholder }) {
    const { register } = useFormContext();

    return (
        <input
            {...register(name, { required:{required}, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i } )}
            name={name || "email"}
            className={`w-full rounded border-slate-300 ${required ? "" : "border-slate-200 shadow-sm"}`}
            type="email"
            required={required}
            readOnly={readOnly}
            onChange={onChange}
            placeholder={placeholder}
            disabled={readOnly}
        />
    );
}
export default React.memo(EmailInput);