# Patient Intake Form App

## Overview

In this project I created a simple, React application, using typescript, formik, and Yup validation, that consists of a series of forms and a data visualization screen.

- Created a multi-step or multi-screen patient enrollment form that gathers standard medical data.
- Tested with React Testing Library
- Used Material-UI for a component library
- Validates all required fields and options utilizing Formik's validation schema with Yup.

### The App Gathers This Information

- Demographic data: name, email, address, birthdate, etc
- Conditions: List conditions by category. Controls are filterable and selections persist between filter selection changes.
- Medical questions: Questionnaire.
- Summary: Shows the patient a summary screen with their selections and provide a mechanism for them to go back and edit any mistakes
- Submit: Show terms and checkbox to accept and a button to submit. On submission it print sthe payload we collected to the console.
- Completed within 5 hours

### Things I would have done with more time

- Extract some of the longer components into smaller components
- Create some more global components like for the Summary Sections and the Questions and RadioGroups so I could just map over a config to render them
- Built out a full integration test for the happy flow of the whole Patient Intake form experience
- Used Mock Service worker to submit an intercepted API request rather than just console loging the submission

## Getting Started

I used `yarn` for the package management system in this, so should be as easy as running `yarn install` and then `yarn start` to run locally.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
