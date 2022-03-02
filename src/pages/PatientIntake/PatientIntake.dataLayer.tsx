import { Button } from "@mui/material";
import { Formik } from "formik";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConditionsForm from "./components/ConditionsForm/ConditionsForm";
import DemographicsForm from "./components/DemographicForm/DemographicsForm";
import QuestionsForm from "./components/QuestionsForm/QuestionsForm";
import Summary from "./components/Summary/Summary";
import s from "./PatientIntake.module.scss";
import type { PatientIntakeFormState } from "./types";
import { PatientIntakeSteps } from "./types";
import {
  DemographicsSchema,
  initialFormState,
  QuestionsSchema,
  SummarySchema,
} from "./utils";

const PatientIntakeDataLayer = () => {
  const step =
    new URLSearchParams(useLocation().search).get("step") || undefined;
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (values: PatientIntakeFormState) => {
      if (step === undefined || step === PatientIntakeSteps.DEMOGRAPHIC) {
        navigate(`?step=${PatientIntakeSteps.CONDITIONS}`);
      } else if (step === PatientIntakeSteps.CONDITIONS) {
        navigate(`?step=${PatientIntakeSteps.QUESTIONS}`);
      } else if (step === PatientIntakeSteps.QUESTIONS) {
        navigate(`?step=${PatientIntakeSteps.SUMMARY}`);
      } else if (step === PatientIntakeSteps.SUMMARY) {
        console.log(values);
      }
    },
    [step, navigate]
  );

  const getSchemaForStep = useCallback(() => {
    switch (step) {
      case PatientIntakeSteps.CONDITIONS:
        return undefined;
      case PatientIntakeSteps.QUESTIONS:
        return QuestionsSchema;
      case PatientIntakeSteps.SUMMARY:
        return SummarySchema;
      case PatientIntakeSteps.DEMOGRAPHIC:
      default:
        return DemographicsSchema;
    }
  }, [step]);

  return (
    <div className={s.patientIntakeContainer}>
      <h1 style={{ alignSelf: "center" }}>Patient Intake</h1>
      <Formik
        initialValues={initialFormState}
        validationSchema={getSchemaForStep()}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => {
          return (
            <>
              {(!step || step === PatientIntakeSteps.DEMOGRAPHIC) && (
                <DemographicsForm />
              )}
              {step === PatientIntakeSteps.CONDITIONS && <ConditionsForm />}
              {step === PatientIntakeSteps.QUESTIONS && <QuestionsForm />}
              {step === PatientIntakeSteps.SUMMARY && <Summary />}
              <Button size="large" sx={{ mt: 3 }} onClick={submitForm}>
                {step !== PatientIntakeSteps.SUMMARY ? "Continue" : "Submit"}
              </Button>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default PatientIntakeDataLayer;
