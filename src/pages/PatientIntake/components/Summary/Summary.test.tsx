/* eslint-disable testing-library/prefer-screen-queries */
import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik, useFormikContext } from "formik";
import moment from "moment";
import { MemoryRouter } from "react-router-dom";
import { PatientIntakeFormStateCompletedFixture } from "../../../../fixtures/PatientIntakeFormStateCompleted";
import { PatientIntakeFormState, PatientIntakeSteps } from "../../types";
import Summary from "./Summary";

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormikContext: jest.fn(),
}));

describe("Summary", () => {
  const formStateFixture = PatientIntakeFormStateCompletedFixture();

  const subject = (
    overrideFormState?: Partial<PatientIntakeFormState>
  ): RenderResult => {
    return render(
      <MemoryRouter>
        <Formik
          initialValues={{ ...formStateFixture, overrideFormState }}
          onSubmit={jest.fn()}
        >
          <Summary />
        </Formik>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    (useFormikContext as jest.Mock).mockReturnValue({
      values: formStateFixture,
      setFieldValue: jest.fn(),
      errors: {},
    });
  });

  it("test that demographic section renders correctly with a filled in form state", async () => {
    const view = subject();

    view.getByText(
      `Name: ${formStateFixture.firstName} ${formStateFixture.lastName}`
    );
    view.getByText(`Gender: ${formStateFixture.gender}`);
    view.getByText(`Phone Number: ${formStateFixture.phoneNumber}`);
    view.getByText(`Marital Status: ${formStateFixture.maritalStatus}`);
    view.getByText(`Email: ${formStateFixture.email}`);
    view.getByText(
      `Date of Birth: ${moment(formStateFixture.dateOfBirth).format(
        "MM/DD/YYYY"
      )}`
    );

    view.getByText(formStateFixture.address.street1);
    view.getByText(
      `${formStateFixture.address.city}, ${formStateFixture.address.state} ${formStateFixture.address.postalCode}`
    );
  });

  it("should render the conditions section correctly with a filled in FormState", () => {
    const view = subject();

    view.getByText(`Conditions: ${formStateFixture.conditions.join(", ")}`);
  });

  it("should render the questions section correctly with a filled in FormState", () => {
    const view = subject();

    view.getByText(
      `Tobacco Use Frequency: ${formStateFixture.tobaccoFrequency}`
    );
  });

  it("should render correct edit links for each section", () => {
    const view = subject();

    Object.values(PatientIntakeSteps).forEach((step, index) => {
      if (step !== PatientIntakeSteps.SUMMARY) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(view.getAllByRole("link")[index]).toHaveAttribute(
          "href",
          `/?step=${step}`
        );
      }
    });
  });

  it("should show an error when agreedToTerms is false", async () => {
    (useFormikContext as jest.Mock).mockReturnValue({
      values: PatientIntakeFormStateCompletedFixture({ agreedToTerms: false }),
      setFieldValue: jest.fn(),
      errors: { agreedToTerms: "Must agree to terms." },
    });
    const view = subject({ agreedToTerms: false });

    await view.findByText("(Must agree to terms.)");
  });
});
