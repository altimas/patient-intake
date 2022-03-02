/* eslint-disable testing-library/prefer-screen-queries */
import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import PatientIntakeDataLayer from "./PatientIntake.dataLayer";

describe("Patient Intake Data Layer", () => {
  const subject = (): RenderResult => {
    return render(
      <MemoryRouter>
        <PatientIntakeDataLayer />
      </MemoryRouter>
    );
  };

  it("should show correct error states when hitting the Continue button and doesnt progress", async () => {
    const view = subject();

    userEvent.click(view.getByRole("button", { name: "Continue" }));

    //Check that all 8 required Text Fields are in error
    await waitFor(() => expect(view.getAllByText("Required").length).toBe(8));
  });

  //TODO: Ran out of time before implementing this
  it.todo("test the happy flow with fillin in all form fields and progressing");
});

export {};
