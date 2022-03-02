import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useFormikContext } from "formik";
import { FormikTextField } from "../../../../components";
import type { PatientIntakeFormState } from "../../types";
import s from "./QuestionsForm.module.scss";

export const FrequencyArray = ["Daily", "Weekly", "Monthly", "Hardly Ever"];

const QuestionsForm = () => {
  const { values, setFieldValue, errors } =
    useFormikContext<PatientIntakeFormState>();

  //TODO: Seperate these Question Sections into their own components we could map from an array
  return (
    <>
      <div className={s.questionSection}>
        <p>Do you smoke any tobacco products?</p>
        <FormControl sx={{ my: 1 }}>
          <RadioGroup
            row
            value={values.useTobacco}
            onChange={(e) =>
              setFieldValue(
                "useTobacco",
                e.target.value === "true" ? true : false
              )
            }
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        {values.useTobacco && (
          <>
            <p>
              How often?{" "}
              {errors.tobaccoFrequency && (
                <span className={s.error}>
                  {"("}
                  {errors.tobaccoFrequency}
                  {")"}
                </span>
              )}
            </p>
            <FormControl sx={{ my: 1 }}>
              <RadioGroup
                row
                value={values.tobaccoFrequency}
                onChange={(e) =>
                  setFieldValue("tobaccoFrequency", e.target.value)
                }
              >
                {FrequencyArray.map((i) => {
                  return (
                    <FormControlLabel
                      value={i}
                      key={`tobacco-${i}`}
                      control={<Radio />}
                      label={i}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </>
        )}
      </div>
      <div className={s.questionSection}>
        <p>Do you drink alcohol?</p>
        <FormControl sx={{ my: 1 }}>
          <RadioGroup
            row
            value={values.drinkAlcohol}
            onChange={(e) =>
              setFieldValue(
                "drinkAlcohol",
                e.target.value === "true" ? true : false
              )
            }
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        {values.drinkAlcohol && (
          <>
            <p>
              How often?{" "}
              {errors.alcoholFrequency && (
                <span className={s.error}>
                  {"("}
                  {errors.alcoholFrequency}
                  {")"}
                </span>
              )}
            </p>
            <FormControl sx={{ my: 1 }}>
              <RadioGroup
                row
                value={values.alcoholFrequency}
                onChange={(e) =>
                  setFieldValue("alcoholFrequency", e.target.value)
                }
              >
                {FrequencyArray.map((i) => {
                  return (
                    <FormControlLabel
                      value={i}
                      key={`alcohol-${i}`}
                      control={<Radio />}
                      label={i}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </>
        )}
      </div>
      <div className={s.questionSection}>
        <p>Have you regularly used illicit drugs?</p>
        <FormControl sx={{ my: 1 }}>
          <RadioGroup
            row
            value={values.illicitDrugUse}
            onChange={(e) =>
              setFieldValue(
                "illicitDrugUse",
                e.target.value === "true" ? true : false
              )
            }
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        {values.illicitDrugUse && (
          <>
            <p>
              How often?{" "}
              {errors.drugUseFrequency && (
                <span className={s.error}>
                  {"("}
                  {errors.drugUseFrequency}
                  {")"}
                </span>
              )}
            </p>
            <FormControl sx={{ my: 1 }}>
              <RadioGroup
                row
                value={values.drugUseFrequency}
                onChange={(e) =>
                  setFieldValue("drugUseFrequency", e.target.value)
                }
              >
                {FrequencyArray.map((i) => {
                  return (
                    <FormControlLabel
                      value={i}
                      key={`drugs-${i}`}
                      control={<Radio />}
                      label={i}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </>
        )}
      </div>
      <Divider sx={{ mb: 3 }} />
      <div className={s.questionSection}>
        <p>
          Please list any medications you are currently taking including
          non-prescription medications, vitamins and supplements.
        </p>
        <FormikTextField
          fullWidth
          name="medications"
          label="Current Medications"
          multiline
        />
      </div>
      <div className={s.questionSection}>
        <p>Please list any medication allergies or reactions</p>
        <FormikTextField
          fullWidth
          name="allergies"
          label="Medication Allergies"
          multiline
        />
      </div>
      <div className={s.questionSection}>
        <p>
          List any surgeries or hospital stays you have had and their
          approximate date / year
        </p>
        <FormikTextField
          fullWidth
          name="surgeriesAndHospitalStays"
          label="Surgeries and Hospital Stays"
          multiline
        />
      </div>
    </>
  );
};

export default QuestionsForm;
