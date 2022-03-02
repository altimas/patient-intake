import { DatePicker } from "@mui/lab";
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormikContext } from "formik";
import { FormikTextField } from "../../../../components";
import { MaritalStatus, PatientIntakeFormState } from "../../types";
import AddressForm from "./AddressForm";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const DemographicsForm = (): JSX.Element => {
  const { values, setFieldValue, errors } =
    useFormikContext<PatientIntakeFormState>();
  return (
    <>
      <FormikTextField
        sx={{ my: 1 }}
        fullWidth
        name="firstName"
        label="First Name"
      />
      <FormikTextField
        sx={{ my: 1 }}
        fullWidth
        name="lastName"
        label="Last Name"
      />
      <FormikTextField
        sx={{ my: 1 }}
        fullWidth
        name="email"
        label="Email Address"
      />
      <FormikTextField
        sx={{ my: 1 }}
        fullWidth
        name="phoneNumber"
        label="Phone Number"
      />
      <FormControl sx={{ my: 1 }} fullWidth>
        <InputLabel>Marital Status</InputLabel>
        <Select
          value={values.maritalStatus}
          label="Marital Status"
          onChange={(e) => setFieldValue("maritalStatus", e.target.value)}
        >
          {Object.values(MaritalStatus).map((i) => {
            return (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div style={{ padding: "16px 0", display: "flex", width: "100%" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={"Date of Birth"}
            value={values.dateOfBirth}
            onChange={(newValue) => {
              setFieldValue("dateOfBirth", newValue);
            }}
            renderInput={(params) => (
              <TextField
                error={Boolean(errors.dateOfBirth)}
                helperText={errors.dateOfBirth}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
        <FormControl sx={{ ml: 4 }} fullWidth>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            value={values.gender}
            onChange={(e) => setFieldValue("gender", e.target.value)}
            row
            aria-labelledby="radio-buttons-gender"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </div>

      <Divider variant="middle" sx={{ my: 2 }} />
      <AddressForm />
    </>
  );
};

export default DemographicsForm;
