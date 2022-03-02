export enum PatientIntakeSteps {
  DEMOGRAPHIC = "demographic",
  CONDITIONS = "conditions",
  QUESTIONS = "questions",
  SUMMARY = "summary",
}

export enum MaritalStatus {
  MARRIED = "Married",
  SINGLE = "Single",
  DIVORCED = "Divorced",
  LIFE_PARTNER = "Life Partner",
  SEPARATED = "Separated",
  WIDOWED = "Widowed",
  OTHER = "Other",
}

export interface PatientIntakeFormState {
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  phoneNumber: string;
  maritalStatus: MaritalStatus;
  email: string;
  dateOfBirth: Date;
  address: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    postalCode: string;
  };
  conditions: Array<Conditions>;
  useTobacco: boolean;
  tobaccoFrequency?: Frequency;
  drinkAlcohol: boolean;
  alcoholFrequency?: Frequency;
  illicitDrugUse: boolean;
  drugUseFrequency?: Frequency;
  medications?: string;
  allergies?: string;
  surgeriesAndHospitalStays?: string;
  agreedToTerms: boolean;
}

export enum Conditions {
  HIGH_BLOOD_PRESSURE = "High Blood Pressure",
  CARDIAC_ARREST = "Cardiac Arrest",
  ARRHYTHMIA = "Arrhythmia",
  CORONARY_HEART_DISEASE = "Coronary Heart Disease",
  IBS = "IBS",
  CROHNS_DISEASE = "Chron's Disease",
  GALLSTONES = "Gallstones",
  DEPRESSION = "Depression",
  ANXIETY = "Anxiety",
  STRESS = "Stress",
  INSOMNIA = "Insomnia",
  CANCER = "Cancer",
  DIABETES = "Diabetes",
}

export enum ConditionTypes {
  CARDIOVASCULAR = "cardiovascular",
  GASTROINTESTINAL = "gastrointestinal",
  PSYCHOLOGICAL = "psychological",
  OTHER = "other",
}

export type Frequency = "Daily" | "Weekly" | "Monthly" | "Hardly Ever";

export const ConditionsArray = [
  {
    type: ConditionTypes.CARDIOVASCULAR,
    condition: Conditions.HIGH_BLOOD_PRESSURE,
  },
  {
    type: ConditionTypes.CARDIOVASCULAR,
    condition: Conditions.CARDIAC_ARREST,
  },
  {
    type: ConditionTypes.CARDIOVASCULAR,
    condition: Conditions.ARRHYTHMIA,
  },
  {
    type: ConditionTypes.CARDIOVASCULAR,
    condition: Conditions.CORONARY_HEART_DISEASE,
  },
  {
    type: ConditionTypes.GASTROINTESTINAL,
    condition: Conditions.IBS,
  },
  {
    type: ConditionTypes.GASTROINTESTINAL,
    condition: Conditions.CROHNS_DISEASE,
  },
  {
    type: ConditionTypes.GASTROINTESTINAL,
    condition: Conditions.GALLSTONES,
  },
  {
    type: ConditionTypes.PSYCHOLOGICAL,
    condition: Conditions.DEPRESSION,
  },
  {
    type: ConditionTypes.PSYCHOLOGICAL,
    condition: Conditions.ANXIETY,
  },
  {
    type: ConditionTypes.PSYCHOLOGICAL,
    condition: Conditions.STRESS,
  },
  {
    type: ConditionTypes.PSYCHOLOGICAL,
    condition: Conditions.INSOMNIA,
  },
  {
    type: ConditionTypes.OTHER,
    condition: Conditions.CANCER,
  },
  {
    type: ConditionTypes.OTHER,
    condition: Conditions.DIABETES,
  },
];
