import { Divider } from "@mui/material";
import { useFormikContext } from "formik";
import moment from "moment";
import { Link } from "react-router-dom";
import { PatientIntakeFormState, PatientIntakeSteps } from "../../types";

import s from "./Summary.module.scss";

const Summary = () => {
  const { values } = useFormikContext<PatientIntakeFormState>();
  return (
    <>
      <h2 className={s.header}>Summary</h2>

      <div className={s.section}>
        <Link
          className={s.editLink}
          to={`?step=${PatientIntakeSteps.DEMOGRAPHIC}`}
        >
          Edit
        </Link>
        <p>{`Name: ${values.firstName} ${values.lastName}`}</p>
        <p>{`Gender: ${values.gender}`}</p>
        <p>{`Phone Number: ${values.phoneNumber}`}</p>
        <p>{`Marital Status: ${values.maritalStatus}`}</p>
        <p>{`Email: ${values.email}`}</p>
        <p>{`Date of Birth: ${moment(values.dateOfBirth).format(
          "MM/DD/YYYY"
        )}`}</p>
        <Divider> Address </Divider>
        <p>{`${values.address.street1}`}</p>
        {values.address.street2 && <p>{`${values.address.street2}`}</p>}
        <p>{`${values.address.city}, ${values.address.state} ${values.address.postalCode}`}</p>
      </div>

      <div className={s.section}>
        <Link
          className={s.editLink}
          to={`?step=${PatientIntakeSteps.CONDITIONS}`}
        >
          Edit
        </Link>
        <p>{`Conditions: ${values.conditions.join(", ")}`}</p>
      </div>

      <div className={s.section}>
        <Link
          className={s.editLink}
          to={`?step=${PatientIntakeSteps.QUESTIONS}`}
        >
          Edit
        </Link>
        {values.useTobacco && (
          <p>{`Tobacco Use Frequency: ${values.tobaccoFrequency}`}</p>
        )}
        {values.drinkAlcohol && (
          <p>{`Alcohol Use Frequency: ${values.alcoholFrequency}`}</p>
        )}
        {values.illicitDrugUse && (
          <p>{`Illicit Drug Use Frequency: ${values.drugUseFrequency}`}</p>
        )}
        {values.medications && <p>{`Medications: ${values.medications}`}</p>}
        {values.allergies && (
          <p>{`Medication Allergies and Reactions: ${values.allergies}`}</p>
        )}
        {values.surgeriesAndHospitalStays && (
          <p>{`Surgeries and Hospital Stays: ${values.surgeriesAndHospitalStays}`}</p>
        )}
      </div>
    </>
  );
};

export default Summary;
