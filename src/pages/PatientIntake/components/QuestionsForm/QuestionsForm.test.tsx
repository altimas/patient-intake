/* eslint-disable testing-library/prefer-screen-queries */
import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik, useFormikContext } from "formik";
import { initialFormState } from "../../utils";
import QuestionsForm from "./QuestionsForm";

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormikContext: jest.fn(),
}));

describe("Questions Form", () => {
  const subject = (): RenderResult => {
    return render(
      <Formik initialValues={initialFormState} onSubmit={jest.fn()}>
        <QuestionsForm />
      </Formik>
    );
  };

  beforeEach(() => {
    (useFormikContext as jest.Mock).mockReturnValue({
      values: initialFormState,
      setFieldValue: jest.fn(),
    });
  });

  it("should render the textfields correctly", () => {
    const view = subject();

    view.getByRole("textbox", { name: "Current Medications" });
    view.getByRole("textbox", { name: "Medication Allergies" });
    view.getByRole("textbox", { name: "Surgeries and Hospital Stays" });
  });

  it("should render the questions correctly", () => {
    const view = subject();

    view.getByText("Do you smoke any tobacco products?");
    view.getByText("Do you drink alcohol?");
    view.getByText("Have you regularly used illicit drugs?");
  });

  it("should update correctly when a Yes is selected", async () => {
    const view = subject();

    userEvent.click(view.getAllByRole("radio", { name: "Yes" })[0]);

    await waitFor(() =>
      expect(useFormikContext().setFieldValue("useTobacco", true))
    );
  });
});
