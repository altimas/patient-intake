import { FormikTextField } from "../../../../components";
import s from "./DemographicsForm.module.scss";

const AddressForm = () => {
  return (
    <>
      <FormikTextField
        sx={{ my: 1 }}
        fullWidth
        name="address.street1"
        label="Street 1"
      />
      <FormikTextField
        sx={{ my: 1 }}
        fullWidth
        name="address.street2"
        label="Street 2"
      />
      <div className={s.row}>
        <FormikTextField
          sx={{ my: 1, mr: 1 }}
          fullWidth
          name="address.city"
          label="City"
        />
        <FormikTextField
          sx={{ m: 1 }}
          fullWidth
          name="address.state"
          label="State"
        />
        <FormikTextField
          sx={{ my: 1, ml: 1 }}
          fullWidth
          name="address.postalCode"
          label="Postal Code"
        />
      </div>
    </>
  );
};

export default AddressForm;
