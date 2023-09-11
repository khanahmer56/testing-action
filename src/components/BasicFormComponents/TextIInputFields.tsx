import { TextField, Typography } from "@mui/material";
import React from "react";
import { useFormContext, FieldError } from "react-hook-form";

interface TextInputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  name,
  placeholder,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <TextField
        id="outlined-basic"
        label={label}
        fullWidth
        placeholder={placeholder || ""}
        variant="outlined"
        {...register(name)}
        error={Boolean(errors[name])}
        helperText={String(errors[name]?.message || "")}
      />
    </div>
  );
};

export default TextInputField;
