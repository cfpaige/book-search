# Google Book Search

Simple React/Express app for fetching the results of Google Books search.

**********************************

The assignment required a thorough explanation of the app's structure and the files' functionality. (Broadly given below and in more detail in some of the files.)

----------------------------------

For this application, the  directory tree (omitting .gitignore, package.json, package-lock.json, LICENSE and README.md files, and any files inside the build and node_modules folders) is:

(Click on the folder names to go to relevant section.)

    book-search
    |-- client
        |-- build
        |-- node_modules
        |-- public
            |-- index.html
            |-- manifest.json
        |-- src
            |-- components
                |-- Book
                    |-- index.js
                    |-- style.css
                |-- Card
                    |-- index.js
                |-- Footer
                    |-- index.js
                |-- Form
                    |-- index.js
                |-- Grid
                    |-- index.js
                |-- Jumbotron
                    |-- index.js
                    |-- style.css
                |-- List
                    |-- index.js
                    |-- style.css
                |-- Nav
                    |-- index.js
                    |-- style.css
            |-- pages
                |-- Home.js
                |-- NoMatch.js
                |-- Saved.js
            |-- utils
                |-- API.js
            |-- App.js
            |-- index.js
            |-- registerServiceWorker.js
    |-- controllers
        |-- bookController.js
        |-- googleController.js
    |-- models
        |-- book.js
        |-- index.js
    |-- node_modules
    |-- routes
        |-- api
            |-- books.js
            |-- google.js
            |-- index.js
        |-- index.js
    |-- Procfile
    |-- server.js

----------------------------------

## CLIENT FOLDER STRUCTURE

(Adapted from [Charles Stover](https://charlesstover.com/)'s article ["Optimal file structure for React applications"](https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145).)

### BUILD folder

The **build** folder is the location of the final, production-ready build. It is created by running `npm run build` once the app is ready for production (deployment).

### NODE_MODULES

The folder **node_modules** is where packages installed by NPM live. It is created by running `npm init` (or `npm init -y` for default settings). Installing additional dependencies by running `npm i <dependency name>` will also put those here.

### PUBLIC folder

The folder **public** is where the app's static files reside. Static content can be delivered to an end user without having to be generated, modified, or processed (so it's one of the simplest and most efficient content types to transmit over the Internet.)

If a file is not imported by the JavaScript application and must maintain its file name, it needs to live in the public directory.

Public files maintain the same file name in production, which means that they can be cached by the client and never downloaded again. (If the file does not have a filename that matters — such as index.html, manifest.json, or robots.txt — it should live in src instead.)

  The manifest.json is used by Progressive Web Applications together with service worker to give the app access to a device's native features.
  Also, from MDN: "The web app manifest provides information about an application (such as name, author, icon, and description) in a JSON text file. The purpose of the manifest is to install web applications to the homescreen of a device, providing users with quicker access and a richer experience.
  (https://developer.mozilla.org/en-US/docs/Web/Manifest)

### SRC folder

The app's dynamic files (imported by the JavaScript application or with mutable contents) should be placed in **src**.

Webpack handles the serving of updated (instead of cached) contents to the client by assigning a unique file name to the changed files in the production build. (So we can use simple, intuitive file names in development, such as header.png instead of header-2019-02-08-final.png, and never have to worry about the client using the outdated cached copy, because Webpack will automatically rename header.png to header.unique-hash.png, where the unique hash changes only when header.png changes.)

#### COMPONENTS

  Not a built-in React folder, but one of the most commonly agreed-on, as a React app could be considered a collection of Components.
  It's considered good practice to keep related code as close as possible. (E.g. style for a component in that component's own folder, or any utilities not shared by any other Components - those can be in their own utils folder within the Component folder.)
  App.js can also be moved into its own folder here, leaving just the entry files (those Webpack needs to start: index.js to render the application to the DOM, and index.css for base style, and possibly the service-worker.js if the application is to be available offline) out in the main src directory.

Including an index.js here makes it possible to import the entire contents of the directory (all Components) by requiring `./components` only. (By default when importing a directory, React will look for the index.js file and grab all the Components imported into it.)
  
The index.js file within each Component folder is the entry point for importing that Component. (It should contain nothing but an export statement that points to the topmost Component at any point in time, because the topmost Component changes often during development.)
    
If a Component is not reusable but a tightly-coupled child Component of another, it's good practice to nest it in its parent Component's directory. (This helps to avoid dead code when deprecating a Component.)

#### ASSETS

  If there are any dependencies shared by the application but which could be considered external to the project itself — such as SASS mixins, images, etc., they can pe put in their own folder here. (Especially useful if there are other people working on the look of the app such as branding or localization/supported languages, so all the non-JS files can be kept and updated together.)
  
#### UTILS

  Utilities, or **utils** (this folder can also be called **helpers** or **packages**), is where all the helper functions that are used globally live, so the code can be kept DRY (Don't Repeat Yourself) easily.
  
  (Export repeated logic to a singular location in **utils** and import it where used, so parts of your application can share logic without copy-pasting.)

#### PAGES

  These components are separate from others in that they are route entry points, and so their best name is not where they are (as the others), but what they do.
  They pull all the other Components together into what's rendered when a client requests a particular route/page/view.
  (Can also be called **routes**.)

----------------------------------

## SERVER-SIDE FILE STRUCTURE

These belong to express (or another server of choice) and make it possible to run the (front-end) React app from the server.





----------------------------------

[Procfile](https://devcenter.heroku.com/articles/procfile) 

Heroku apps include a Procfile that specifies the commands that are executed by the app on startup. You can use a Procfile to declare a variety of process types, including:

Your app’s web server
Multiple types of worker processes
A singleton process, such as a clock
Tasks to run before a new release is deployed
Each dyno in your app belongs to one of the declared process types, and it executes the startup command associated with that process type.

