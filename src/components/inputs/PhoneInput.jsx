import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import swal from "sweetalert2";

function PhoneInput({ name, onChange, value, required = true, readOnly = false, className }) {
    const ref = useRef();
    const { register, setValue } = useFormContext();
    const [inputMaxLength, setInputMaxLength] = useState(16);

    const phoneRegex = /^\([2-9]{1}[0-9]{2}\) [2-9]{1}[0-9]{2} - [0-9]{4}$/;

    useEffect(() => {
        const formattedPhoneNumber = formatPhoneNumber(value);
        setValue(name, formattedPhoneNumber);
    }, [value]);

    const formatPhoneNumber = (value) => {
        if (!value) return value;

        var phoneNumber = value.replace(/[^\d]/g, '');

        if (phoneNumber.length < 4) return phoneNumber;
        if (phoneNumber.length < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)} - ${phoneNumber.slice(6, 10)}`;
    };

    const onChangePhone = async (event) => {
        if (event.target.value.length > inputMaxLength) {
            swal.fire("Ups!", "Please insert a valid phone number", "error");
        }
        const formattedPhoneNumber = formatPhoneNumber(event.target.value);

        if (formattedPhoneNumber.length == inputMaxLength)
            if (!phoneRegex.test(formattedPhoneNumber))
                swal.fire("Ups!", "Please insert a valid phone number", "error");

        setValue(name, formattedPhoneNumber);
    };

    return (
        <div className="flex flex-col">
            <input
                {...register(name, {
                    required: required,
                    /*pattern: {
                        value: phoneRegex,
                        message: "Please enter a valid phone number"
                    }*/
                })}
                name={name}
                className={className || 'cclphoneinput rounded border-slate-300'}
                placeholder="(   ) ___ - _____"
                maxLength={inputMaxLength}
                minLength={inputMaxLength}
                required={required}
                readOnly={readOnly}
                onChange={onChangePhone}
                disabled={readOnly}
            />
        </div>
    );
}

export default React.memo(PhoneInput);
