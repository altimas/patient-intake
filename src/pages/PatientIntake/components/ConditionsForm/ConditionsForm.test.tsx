/* eslint-disable testing-library/prefer-screen-queries */
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { Formik, useFormikContext } from "formik";
import { Conditions } from "../../types";
import { initialFormState } from "../../utils";
import ConditionsForm from "./ConditionsForm";
import faker from "faker";

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormikContext: jest.fn(),
}));

describe("ConditionsForm", () => {
  const subject = (): RenderResult => {
    return render(
      <Formik initialValues={initialFormState} onSubmit={jest.fn()}>
        <ConditionsForm />
      </Formik>
    );
  };

  beforeEach(() => {
    (useFormikContext as jest.Mock).mockReturnValue({
      values: initialFormState,
      setFieldValue: jest.fn(),
    });
  });

  it("renders the component with the correct condition options", async () => {
    const view = subject();

    Object.values(Conditions).forEach((condition) => {
      expect(view.getByRole("button", { name: condition })).toBeInTheDocument();
    });
  });

  it("should be able to randomly select conditions and update it", async () => {
    const view = subject();
    const randomCondition = faker.random.arrayElement(
      Object.values(Conditions)
    );

    fireEvent.click(view.getByRole("button", { name: randomCondition }));

    await waitFor(() =>
      expect(useFormikContext().setFieldValue).toHaveBeenCalledWith(
        "conditions",
        [randomCondition]
      )
    );
  });
});
