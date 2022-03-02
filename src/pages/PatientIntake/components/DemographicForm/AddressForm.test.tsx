/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { Formik } from "formik";
import { DemographicsSchema, initialFormState } from "../../utils";
import AddressForm from "./AddressForm";
import userEvent from "@testing-library/user-event";

describe("AddressForm", () => {
  const subject = (): RenderResult => {
    return render(
      <Formik
        initialValues={initialFormState}
        onSubmit={jest.fn()}
        validationSchema={DemographicsSchema}
      >
        <AddressForm />
      </Formik>
    );
  };

  it("should render correctly with the form fields in place", () => {
    const view = subject();

    view.getByRole("textbox", { name: "Street 1" });
    view.getByRole("textbox", { name: "Street 2" });
    view.getByRole("textbox", { name: "City" });
    view.getByRole("textbox", { name: "State" });
    view.getByRole("textbox", { name: "Postal Code" });
  });

  it("should show an error code for an invalid PostalCode", async () => {
    const view = subject();

    const postalCodeInput = view.getByRole("textbox", { name: "Postal Code" });

    userEvent.type(postalCodeInput, "345");
    fireEvent.blur(postalCodeInput);

    await view.findByText("Invalid");
  });
});
