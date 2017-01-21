# Angular v1.5.x app for managing users data ![Home page](https://travis-ci.org/moonbrv/angular1-example-app.svg?branch=master "Home page")
This SPA was created for learning Angularjs framework, and for improvement my developer skills. App builded on components and use ES6, have routing. Controllers,service and directives have unit tests for their methods.

## Do you want to see it?
  - [Live preview](https://moonbrv.github.io/angular1-example-app/)
  - [Screenshots](/screenshots/screenshots.md)

## Requirenment:
  - Node v5+ (because ui-router v1+ need nodejs v5+)

## Which features was created:
  - Fetching data from external API and store it in Service.
  - Display users data in the table, created by ng-table, with sorting and filter options.
  - Delete, edit and add users.
  - Routing via angular-ui-router. Routing without html5 mode because gh-pages not support it yet.
  - Reusing <add-user> component for different purposes(adding and edit users data).
  - App builded on components.
  - Form validation by using Angular form parameters.
  - Created two custrom validator directive (unique-email, unique-username)

## Which technologies I used:
  - Angularjs 1.5.9 + ES6
  - Angular-ui-router
  - Angular-messages
  - Ng-table
  - Karma + Jasmine
  - Webpack
  - SCSS
  - Bootstrap
  - ESLint + Stylelint
