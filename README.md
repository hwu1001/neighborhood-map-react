# Neighborhood Map Project
## Instructions
See the [Known Issues](#known-issues) section below before running the app.

To get started you can:
* Install `npm`
* Clone this repo with `git clone`
* Once you have the repo and get into the repo directory run `npm install`
* If you don't want to test with service workers you can run the dev build with `npm start`

To test with service workers in the production build:
* You will need something like Node's `serve` to run the build. For alternatives see here: https://facebook.github.io/create-react-app/docs/deployment
* In the repo run `npm run build`
* If you have `serve` then you can run `serve -s build` and navigate to the link where the webpage is served in a browser.

## Dependencies
* React
* Leaflet
* React Leaflet
* React Leaflet Sidetabs
* React Icons
* Animate.css
* Data is provided by the Foursquare API

## Create React App
This project was bootstrapped with[ Create React App](https://github.com/facebook/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Known issues
* There's an issue in the React Leaflet library where adding multiple classes to a specific component will generate an error. A modified version of `Pane.js` is in the repo can be used in place of the one that is put into `node_modules/` automatically. The file is located at `/node_modules/react-leaflet/es/Pane.js`. The modified version will prevent any errors and allow the markers to bounce when clicked.