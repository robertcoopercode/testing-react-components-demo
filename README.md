# Testing React Components Demo
A repo that contains two components (Checklist & SelectTwo), that are written as functional and class components. The functional components as tested with react-testing-library and the class components are tested with enzyme.

This demo is used to accompany this article I wrote on the subject of testing react components with react-testing-library. I explain why react-testing-library is better than enzyme when it comes to testing react components.

## Run the app
To see a live demo of the components' actual behaviour, you can run the app by using the following commands:

```bash
yarn install # install project dependencies
yarn start # start the development server at http://localhost:3000/
```

## Run the tests
To run the tests make sure the have installed the project dependencies (see above), and then run `yarn test`. This will run the tests in watch mode, which watches for file changes and automatically runs tests after any file change.
