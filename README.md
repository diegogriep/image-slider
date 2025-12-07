# ImageSlider

It's library or framework-agnostic.
Followed the KISS and DRY principles.

## Tools

Typescript.

The bundler uses Webpack.

Installed JEST for unit testing.

Prettier and ESLint to provide basic code validation.

## Installation

`npm i`

## Running the app

`npm run dev`

After installation, the application will be available on <http://localhost:3000>.

## Test

`npm test`

It´s possible to see the code coverage in the coverage folder.

## Build

`npm run build`

A `dist` folder will be created.

## Folder structure

    /image-slider/src
    ├── assets
    ├── components
    ├── styles
    ├── utils
    ├── index.html
    ├── index.ts
    └── styles.scss

## Code pattern

SASS / CSS => Usually, I follow BEM to organize the styles; however, this is a simple application with few elements, so just the tags were enough.

TS

The `index.ts` file is responsible for instantiating the ImageSlider class, which in turn calls the other Classes and methods.

...and that's it.
