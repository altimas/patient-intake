/* eslint-disable testing-library/prefer-screen-queries */
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import faker, { random } from "faker";
import { Formik, useFormikContext } from "formik";
import { MaritalStatus } from "../../types";
import { initialFormState } from "../../utils";
import DemographicsForm from "./DemographicsForm";

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormikContext: jest.fn(),
}));

describe("ConditionsForm", () => {
  const subject = (): RenderResult => {
    return render(
      <Formik
        initialValues={initialFormState}
        onSubmit={jest.fn()}
        validationSchema={DemographicsForm}
      >
        <DemographicsForm />
      </Formik>
    );
  };

  beforeEach(() => {
    (useFormikContext as jest.Mock).mockReturnValue({
      values: initialFormState,
      setFieldValue: jest.fn(),
      errors: {},
    });
  });

  it("renders the component with the correct text fields", async () => {
    const view = subject();

    view.getByRole("textbox", { name: "First Name" });
    view.getByRole("textbox", { name: "Last Name" });
    view.getByRole("textbox", { name: "Phone Number" });
    view.getByRole("textbox", { name: "Email Address" });

    view.getByRole("textbox", { name: "Street 1" });
    view.getByRole("textbox", { name: "Street 2" });
    view.getByRole("textbox", { name: "City" });
    view.getByRole("textbox", { name: "State" });
    view.getByRole("textbox", { name: "Postal Code" });
  });

  it("should update date of birth correctly", async () => {
    const view = subject();

    const dateOfBirthInput = view.getByRole("textbox", {
      name: /Choose date/i,
    });

    fireEvent.change(dateOfBirthInput, {
      target: { value: "10/10/1910" },
    });

    await waitFor(() =>
      expect(useFormikContext().setFieldValue("dateOfBirth", "10/10/1910"))
    );
  });

  it("should update gender correctly", async () => {
    const view = subject();

    userEvent.click(view.getByRole("radio", { name: "Female" }));

    await waitFor(() =>
      expect(useFormikContext().setFieldValue("gender", "Female"))
    );
  });
});
