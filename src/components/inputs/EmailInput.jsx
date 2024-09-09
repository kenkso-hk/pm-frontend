import React from "react";
import { useFormContext } from "react-hook-form";

function EmailInput({ name, required = true, readOnly = false, onChange, placeholder, className = "" }) {
  const { register } = useFormContext();

  return (
    <input
      {...register(name, { 
        required: { value: required, message: "This field is required" }, 
        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email address" }
      })}
      name={name || "email"}
      className={`w-full rounded border-slate-300 ${className}`}  // Combinar clases externas
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
