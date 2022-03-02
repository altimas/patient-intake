import { MaritalStatus } from "./types";
import type { PatientIntakeFormState } from "./types";
import * as Yup from "yup";
import { PhoneNumberUtil } from "google-libphonenumber";
import { FrequencyArray } from "./components/QuestionsForm/QuestionsForm";

export const initialFormState: PatientIntakeFormState = {
  firstName: "",
  lastName: "",
  gender: "other",
  phoneNumber: "",
  maritalStatus: MaritalStatus.MARRIED,
  email: "",
  dateOfBirth: new Date(),
  conditions: [],
  useTobacco: false,
  drinkAlcohol: false,
  illicitDrugUse: false,
  address: {
    state: "",
    city: "",
    postalCode: "",
    street1: "",
  },
};

//Utility Functions
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const phoneReg = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

  if (!phoneReg.test(phone)) return false;

  const number = phoneUtil.parseAndKeepRawInput(phone, "US");
  return phoneUtil.isValidNumberForRegion(number, "US");
};

export const isZipCodeValid = (zipCode: string): boolean => {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};

//Form Validation Schemas
export const DOBValidationSchema = Yup.string().required("Required");
export const FirstNameSchema = Yup.string().required("Required");
export const LastNameSchema = Yup.string().required("Required");
export const EmailAddressSchema = Yup.string()
  .email("Invalid")
  .required("Required");
export const PhoneNumberSchema = Yup.string()
  .required("Required")
  .test(
    "valid-phonenumber",
    "Invalid format (###) ###-####",
    (val) => !val || validatePhoneNumber(val || "")
  );
export const RequiredStringSchema = Yup.string().required("Required");
export const PostalCodeSchema = Yup.string()
  .required("Required")
  .test("valid-zipcode", "Invalid", (val) =>
    isZipCodeValid(val?.toString() || "")
  );

//Patient Intake Step Schemas
export const DemographicsSchema = Yup.object().shape({
  firstName: FirstNameSchema,
  lastName: LastNameSchema,
  email: EmailAddressSchema,
  gender: Yup.string().oneOf(["male", "female", "other"]),
  phoneNumber: PhoneNumberSchema,
  dateOfBirth: DOBValidationSchema,
  address: Yup.object().shape({
    street1: RequiredStringSchema,
    street2: Yup.string().nullable(),
    city: RequiredStringSchema,
    state: RequiredStringSchema,
    postalCode: PostalCodeSchema,
  }),
});

export const QuestionsSchema = Yup.object().shape({
  tobaccoFrequency: Yup.string()
    .nullable()
    .when("useTobacco", {
      is: true,
      then: Yup.string().oneOf(FrequencyArray).required("Required"),
    }),
  alcoholFrequency: Yup.string()
    .nullable()
    .when("drinkAlcohol", {
      is: true,
      then: Yup.string().oneOf(FrequencyArray).required("Required"),
    }),
  drugUseFrequency: Yup.string()
    .nullable()
    .when("illicitDrugUse", {
      is: true,
      then: Yup.string().oneOf(FrequencyArray).required("Required"),
    }),
});
