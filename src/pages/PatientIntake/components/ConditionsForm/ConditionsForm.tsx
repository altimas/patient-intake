import { Button, ButtonGroup } from "@mui/material";
import { useFormikContext } from "formik";
import { useState } from "react";
import {
  ConditionsArray,
  ConditionTypes,
  PatientIntakeFormState,
} from "../../types";
import s from "./ConditionsForm.module.scss";

const ConditionsForm = () => {
  const [selectedTypes, setSelectedTypes] = useState<ConditionTypes[]>(
    Object.values(ConditionTypes)
  );
  const { values, setFieldValue } = useFormikContext<PatientIntakeFormState>();

  return (
    <>
      <p>Select all applicable conditions.</p>
      <ButtonGroup
        sx={{ my: 2 }}
        variant="contained"
        aria-label="outlined conditions button group"
      >
        {Object.values(ConditionTypes).map((type) => {
          const active = selectedTypes.includes(type);
          return (
            <Button
              color={active ? "success" : "primary"}
              key={type}
              onClick={() => {
                if (active) {
                  setSelectedTypes(selectedTypes.filter((i) => i !== type));
                } else {
                  setSelectedTypes([...selectedTypes, type]);
                }
              }}
            >
              {type}
            </Button>
          );
        })}
      </ButtonGroup>
      <div className={s.conditionsRow}>
        {ConditionsArray.filter((condition) =>
          selectedTypes.includes(condition.type)
        ).map((item) => {
          const active = values.conditions.includes(item.condition);
          return (
            <Button
              variant="contained"
              key={item.condition}
              sx={{ m: 2 }}
              color={active ? "success" : "primary"}
              onClick={() => {
                if (active) {
                  setFieldValue(
                    "conditions",
                    values.conditions.filter((i) => i !== item.condition)
                  );
                } else {
                  setFieldValue("conditions", [
                    ...values.conditions,
                    item.condition,
                  ]);
                }
              }}
            >
              {item.condition}
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default ConditionsForm;
