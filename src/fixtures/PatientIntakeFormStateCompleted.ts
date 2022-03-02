import faker from "faker";
import { FrequencyArray } from "../pages/PatientIntake/components/QuestionsForm/QuestionsForm";
import {
  Conditions,
  MaritalStatus,
  PatientIntakeFormState,
  Frequency,
} from "../pages/PatientIntake/types";

export const PatientIntakeFormStateCompletedFixture = (
  overrides?: Partial<PatientIntakeFormState>
): PatientIntakeFormState => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  gender: faker.random.arrayElement(["male", "female", "other"]),
  phoneNumber: faker.phone.phoneNumber(),
  maritalStatus: faker.random.arrayElement(Object.values(MaritalStatus)),
  email: faker.internet.email(),
  dateOfBirth: faker.date.past(),
  address: {
    street1: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    postalCode: faker.address.zipCode(),
  },
  conditions: faker.random.arrayElements(Object.values(Conditions)),
  useTobacco: true,
  tobaccoFrequency: faker.random.arrayElement(FrequencyArray) as Frequency,
  drinkAlcohol: false,
  illicitDrugUse: false,
  medications: faker.lorem.words(5),
  surgeriesAndHospitalStays: faker.lorem.words(10),
  agreedToTerms: false,
  ...overrides,
});
