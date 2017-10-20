# Before running anything, please install all dependencies by running #
```
npm install
```

# To run the application in offline mode #

Runs the front-end application utilizing a node middleware that acts as a backend server responding to front-end backend requests. See documentation for backend-middleware node package.

```
npm run start:offline
```

# To run the application in local dev mode #

Runs the front-end application expecting backend aplication to be running on developer's workstation.

```
npm run start:dev
```

# Build configurations #

## webpack.common.js ##
The build configuration common to builds for local development (running with web pack dev server) and deployment to test/prod servers.  

Webpack hashes the output bundle.js file to avoid the file being cached. Also the build will build a vendor.js (also hashed) from all the dependencies so that the dependencies do not need to be deployed every time if not changed.

## Stying with sass and css ##
Webpack uses __sass-loader__ to compile sass into css. It then uses __css-loader__ to turn it into a JS module. Finally the __ExtractTextPlugin__ extracts it into a seperate file and hashes the file name.

## Environment specific build configurations ##
When running front-end application as a node application using webpack development server. (see server.js) webpack.local.js is going to be merged with webpack.common.js when running the front-end app in offline or dev mode enabling hot reload features.

When building the front-end application to deploy to test/prod servers then webpack.deploy.js will be merged with webpack.common.js to allow for favicons generation for a multitude of user agents.

# To run test #
```
npm run test
```
We use jest as our test runner
