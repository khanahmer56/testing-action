import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RawAutoCompleteProps {
  option: any[]; //
  label: string;
  name: string;
  placeholder?: string;
}
const RawAutoComplete: React.FC<RawAutoCompleteProps> = ({
  option,
  label,
  name,
  placeholder,
}) => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext();
  return (
    <div>
      <select
        {...register(name)}
        placeholder={placeholder}
        aria-label={label}
        aria-describedby={label}
        style={{
          width: "100%",
          height: "100%",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",

          backgroundColor: "#fff",
        }}
      >
        {option.map((item) => {
          return (
            <option
              value={item}
              style={{ backgroundColor: "#fff", padding: "1rem" }}
            >
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default RawAutoComplete;
