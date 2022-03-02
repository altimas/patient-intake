import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";

const FormikTextInput: React.FC<TextFieldProps> = (props) => {
  const [field, meta] = useField(props.name || "");
  const showError = Boolean(meta.touched && meta.error);
  return (
    <TextField
      {...field}
      {...props}
      error={showError}
      helperText={showError && meta.error}
      variant="outlined"
    />
  );
};

export default FormikTextInput;
