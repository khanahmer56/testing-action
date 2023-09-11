// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import { useFormContext } from "react-hook-form";
// import { Typography } from "@mui/material";

// interface SelectAutoCompleteProps {
//   option: string[]; // Adjust the type of `option` as per your specific requirements
//   label: string;
//   name: string;
//   placeholder?: string;

//   capitalizeData?: boolean;
// }

// export default function SelectAutoComplete({
//   option,
//   label,
//   name,
//   placeholder,
// }: SelectAutoCompleteProps) {
//   const {
//     control,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useFormContext();
//   const value = watch(name);

//   const handleInputChange = (event: React.ChangeEvent<{}>, newValue: any) => {
//     setValue(name, newValue);
//   };

//   return (
//     <Autocomplete
//       disablePortal
//       id={label || name}
//       options={option}
//       placeholder={placeholder}
//       value={value}
//       onChange={handleInputChange}
//       renderInput={(params) => (
//         <>
//           <TextField
//             {...params}
//             label={label}
//             error={Boolean(errors[name])}
//             // helperText={errors[name]?.message}
//           />
//           <Typography variant="caption" color="error">
//             {errors[name] && (errors[name] as { message: string }).message}
//           </Typography>
//         </>
//       )}
//     />
//   );
// }
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";

interface SelectAutoCompleteProps {
  option: any[];
  label: string;
  name: string;
  placeholder?: string;
}

export default function SelectAutoComplete({
  option,
  label,
  name,
  placeholder,
}: SelectAutoCompleteProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <Autocomplete
            disablePortal
            id={label || name}
            options={option}
            value={field.value}
            onChange={(event, newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => {
              console.log("params", params);
              return (
                <>
                  <TextField
                    {...params}
                    label={label}
                    error={Boolean(errors[name])}
                    placeholder={placeholder}
                    helperText={String(errors[name]?.message || "")}
                    onBlur={field.onBlur}
                  />
                </>
              );
            }}
          />
        );
      }}
    />
  );
}
