# ProgettoTestScritturaSuJson

I write this file to help myself write to the file system with a web app

# npm path-browserify and fs-extra
They are two NPM packages that provide functionality for working with file paths and file system, respectively. 

path-browserify: This package is a browser-compatible version of Node.js's core path module. Because Angular runs in the browser, it doesn't have direct access to Node core modules.js as paths.

fs-extra: fs-extra is an extension of Node's fs core module.js which adds additional methods and improves some of the existing features. Since Angular runs in the browser, it does not have direct access to the fs module.

# webpack.config.js
 Webpack is used by the Angular CLI to create the application bundle, including JavaScript, CSS, and other assets. Webpack configuration defines how various application modules and dependencies are handled during the bundle creation process.

 Defines an alias for the fs module pointing to fs-extra. This allows you to import fs-extra using simply import * as fs from 'fs'; in code.

Configure fallbacks for Node core modules.js which are not available in the browser context, such as path and process. The fallback for the path module is set to path-browserify, a browser-compatible version of the Node.js path module. The fallback for the process module is set to process/browser, a polyfill for the Node.js process object.

Set the Webpack target to 'electron-renderer' to indicate that compiled code will run in Electron's rendering process, which combines both browser and Node.js APIs.

# typings.d.ts
The typings.d.ts file is a TypeScript declaration file that is used to provide information about the types of external modules or libraries that may not have default or updated TypeScript types.