import React, { useEffect } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import TextInputField from "../BasicFormComponents/TextIInputFields";
import { GridChild, StyledGrid } from "../../style";
import { Button, Paper } from "@mui/material";
import SelectAutoComplete from "../BasicFormComponents/SelectAutoComplete";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import RawAutoComplete from "../BasicFormComponents/RawAutoComplete";

const BasicForm = () => {
  const schemaValidation = yup.object().shape({
    name: yup.string().required("Name is required"),
    sex: yup.string().required("Required field"),

    // date: yup.string().required("Date is required"),
    date: yup
      .string()
      .transform(function (value, originalValue) {
        if (originalValue && originalValue.includes("/")) {
          const date = moment(originalValue, "DD/MM/YYYY");
          const unixTimestamp = date.isValid() ? date.unix() : null;
          return String(unixTimestamp);
        } else {
          const age = parseInt(originalValue, 10);
          const currentTimestamp = Math.floor(Date.now() / 1000);
          const birthTimestamp = currentTimestamp - age * 31536000;

          return String(birthTimestamp);
        }
      })
      .required("Date is required"),
    mobile: yup
      .string()
      .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
      .required("Mobile number is required"),
    martial_status: yup.string().required("Martial status is required"),
    guardian_details: yup
      .string()
      .test(
        "guardian_details",
        "Guardian details is required",
        function (value) {
          const guardianName = this.parent.guardian_name;
          if (guardianName && guardianName.trim() !== "") {
            return (
              !!value ||
              this.createError({
                message: "Guardian details is required",
                path: "guardian_details",
              })
            );
          }
          return true;
        }
      ),

    // guardian_name: yup.string().when("guardian_details", {
    //   is: (guardian_details) => (guardian_details ? true : false),
    //   then: () => yup.string().required("Guardian name is required"),
    // }),

    email: yup.string().email("Invalid email address"),
  });

  type FormValues = {
    name: string;
    date: string;
    sex: string;
    mobile: number;
    gov_issued_id: string;
    id: number;
    martial_status: string;
    guardian_details: string;
    guardian_name: string;
    email: string;
    country: string;
    nationality: string;
    age: string;
  };

  const methods = useForm<FormValues>({
    resolver: yupResolver(schemaValidation),
  });
  // const countryValue = methods.watch("country");
  const a = 5;
  const b = 6;
  const nationn = methods.watch("nationality");
  const country = methods.watch("country");
  const currentAge = methods.watch("age");

  useEffect(() => {
    // Check if the selected country is "India"
    if (nationn === "Indian") {
      console.log("testingg", methods);
      // Set the nationality field to "Indian"
      methods.setValue("country", "India");
    } else if (nationn === "Pakistani") {
      console.log("coubhghyg");
      // Reset the nationality field when country is not "India"
      methods.setValue("country", "Pakistan");
    } else if (nationn === "American") {
      methods.setValue("country", "America");
    } else if (nationn === "Bangladeshi") {
      methods.setValue("country", "Bangladesh");
    } else {
      methods.setValue("country", "");
    }
  }, [nationn, methods.setValue]);
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) =>
    console.log(data);
  return (
    <>
      <h1 data-testid="mytestid">hello</h1>
      <span title="sum">{a + b}</span>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Paper>
            <StyledGrid>
              <GridChild>
                <TextInputField name="name" label="Name" />
              </GridChild>

              <GridChild>
                <TextInputField
                  name="date"
                  label="Date"
                  placeholder="Enter Date in DD/MM/YYYY or in Age "
                />
              </GridChild>
              <GridChild>
                <SelectAutoComplete
                  name="sex"
                  label="Sex"
                  option={["Male", "Female", "Other"]}
                />
              </GridChild>
              <GridChild>
                <TextInputField name="mobile" label="Mobile" />
              </GridChild>
              <GridChild>
                <SelectAutoComplete
                  name="gov_issued_id"
                  label={"Govt. Issued ID"}
                  option={["Aadhar", "Pan", "Voter ID", "Passport"]}
                />
              </GridChild>

              <GridChild>
                <TextInputField
                  name="id"
                  label=""
                  placeholder="Enter Govt ID"
                />
              </GridChild>
            </StyledGrid>
            <h1>Contact Details</h1>
            <StyledGrid>
              <GridChild>
                <TextInputField
                  name="guardian_details"
                  label={"Guardian Details"}
                />
              </GridChild>
              <GridChild>
                <TextInputField
                  name="guardian_name"
                  label=""
                  placeholder="Enter Guardian Name"
                />
              </GridChild>
              <GridChild>
                <TextInputField
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                />
              </GridChild>
              <GridChild>
                <TextInputField
                  name="emergency_contact"
                  label="Emergency Contact Number"
                  placeholder="Enter Emergency Contact Number"
                />
              </GridChild>
            </StyledGrid>
            <h1>Address Details</h1>
            <StyledGrid>
              <GridChild>
                <TextInputField
                  name="address"
                  label={"Address"}
                  placeholder="Enter Address"
                />
              </GridChild>
              <GridChild>
                <SelectAutoComplete
                  name="state"
                  label="State"
                  placeholder="Enter State"
                  option={["Maharashtra", "UttarPradesh", "Bihar"]}
                />
              </GridChild>
              <GridChild>
                <SelectAutoComplete
                  name="city"
                  label="City"
                  placeholder="Enter City"
                  option={["Kanpur", "Mumbai", "Patna"]}
                />
              </GridChild>

              <GridChild>
                <SelectAutoComplete
                  name="nationality"
                  label="Nationality"
                  placeholder="Enter nationality"
                  option={["Indian", "Pakistani", "Bangladeshi", "American"]}
                />
              </GridChild>
              <GridChild>
                <TextInputField
                  name="country"
                  label=""
                  placeholder="Enter Country"
                />
              </GridChild>
              <GridChild>
                <TextInputField
                  name="pincode"
                  label="Pincode"
                  placeholder="Enter Pincode"
                />
              </GridChild>
            </StyledGrid>
            <h1>Others Details</h1>
            <StyledGrid>
              <GridChild>
                <TextInputField
                  name="occupation"
                  label={"Occupation"}
                  placeholder="Enter Occupation"
                />
              </GridChild>
              <GridChild>
                <SelectAutoComplete
                  name="religion"
                  label="Religion"
                  placeholder="Enter Religion"
                  option={["Hindu", "Muslim", "Sikh", "Christian"]}
                />
              </GridChild>
              <GridChild>
                <TextInputField
                  name="age"
                  label="Age"
                  placeholder="Enter Age"
                />
              </GridChild>
              <span
                data-testid="age-message"
                style={{ visibility: +currentAge == 10 ? "visible" : "hidden" }}
              >
                You are too young!
              </span>

              <div
                style={{
                  visibility: +currentAge > 20 ? "visible" : "hidden",
                  width: "100%",
                }}
              >
                <GridChild>
                  <SelectAutoComplete
                    name="martial_status"
                    label="Martial Status"
                    placeholder="Enter Martial Status"
                    option={["Married", "Unmarried"]}
                  />
                </GridChild>
              </div>

              <GridChild>
                <SelectAutoComplete
                  name="blood_group"
                  label="Blood Group"
                  placeholder="Group"
                  option={["AB-", "AB+", "O+", "0-"]}
                />
              </GridChild>
              <GridChild>
                <RawAutoComplete
                  name="blood_status"
                  label="Blood Group"
                  placeholder="Group"
                  option={["AB-", "AB+", "O+", "0-"]}
                />
              </GridChild>
            </StyledGrid>
            <Button type="submit" variant="contained" sx={{ my: 4 }}>
              Submit
            </Button>
          </Paper>
        </form>
      </FormProvider>
    </>
  );
};

export default BasicForm;
