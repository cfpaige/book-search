# Google Book Search

Simple React/Express app for fetching the results of Google Books search.

**********************************

The assignment required a thorough explanation of the app's structure and the files' functionality. (Broadly given below and in more detail in some of the files.)

----------------------------------

For this application, the  directory tree (omitting .gitignore, package.json, package-lock.json, LICENSE and README.md files, and any files inside the build and node_modules folders) is:

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

The **build** directory is the location of the final, production-ready build. React Create App comes with [Webpack](https://webpack.js.org/) set up out of the box, so the bundle can be created by running `npm run build` once the application is ready for production. 

The ready build folder contains the bundled code of the app, and is the directory used by (in this case) Heroku for deployment. 

(Bundling is the process of following imported files and merging them into a single file: a “bundle”. This bundle can then be included on a webpage to load an entire app at once. A bundled app loads faster and uses less data. In npm in general, bundling is done with tools such as [Webpack](https://webpack.js.org/) or [Browserify](http://browserify.org/). For projects not otherwise using Node.js, [Gulp](https://gulpjs.com/), [Grunt](https://gruntjs.com/), [Bower](https://bower.io/) or others might be preferred. The advantage of using npm here is that the build process can be placed in package.json, leading to much less overhead, as this then is the only file to update as opposed to several when using other tools.)

### NODE_MODULES

The folder **node_modules** is where packages installed by [npm](https://www.npmjs.com/) live. It is created by running `npm init` (or `npm init -y` for default settings) from the command line in the root directory of the app. Installing additional dependencies by running `npm i <dependency name>` will also put those here.

The Google Book Search application has two such folders, one for the server (Express) and one for the front-end (React). The latter npm packages are loaded into the app by running the above command in the client folder. The use of Node.js isn't required to build a React app, but the library provides functionality that makes development and deployment easier. (E.g. being able to use the command `npm start` to test the app locally during development, or `npm run build` for neatly bundling the code for production, which benefits the client by reducing the number of requests for the page and the bandwidth required, and helps the developer by making the use of tools such as Babel possible without having to worry about different browsers' ability to read code written with those).

### PUBLIC folder

The folder **public** is where the app's static files are placed. Static content can be delivered to an end user without having to be generated, modified, or processed.

If a file is not imported by the JavaScript application and must maintain its file name, it belongs in this directory. Public files maintain the same file name in production, which means that they can be cached by the client and never downloaded again. (If the file does not have a filename that matters — such as index.html, manifest.json, or robots.txt — it should live in src instead.)

The Google Book Search app's public folder contains two files: index.html and manifest.json. Both are generated by React when the app is first created.

The **_index.html_** file is the destination for all of the front-end logic. The container `<div id="root"></div>` in the body of /public/index.html is where `ReactDOM.render(<App />, document.getElementById("root"))` in /src/index.js points. Beyond including the app's name, this file can be left unchanged, except where CDNs (Content Delivery Networks) are used for styles or other front-end functionality. Then, the links to those should be included here (as with a standard HTML web page).

The **_manifest.json_** "provides information about an application (such as name, author, icon, and description) in a JSON text file. The purpose of the manifest is to install web applications to the homescreen of a device, providing users with quicker access and a richer experience." (From [MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest).) In this way, the manifest also makes it possible for PWAs (Progressive Web Applications) together with a service worker to give the app access to a device's native features (otherwise only available to apps built for specific native platforms).

### SRC folder

The app's dynamic files (imported by the JavaScript application or with mutable contents) should be placed in **src**.

Webpack handles the serving of updated (instead of cached) contents to the client by assigning a unique file name to the changed files in the production build. (So we can use simple, intuitive file names in development, such as header.png instead of header-2019-02-08-final.png, and never have to worry about the client using the outdated cached copy, because Webpack will automatically rename header.png to header.unique-hash.png, where the unique hash changes only when header.png changes.)

#### ASSETS

If there are any dependencies shared by the application but which could be considered external to the project itself — such as SASS mixins, images, etc., they can pe put in their own folders in the assets directory. (Especially useful if there are other people working on the look of the app (such as branding or localization/supported languages), so all the non-JS files can be kept and updated together.)

This Google Book Search app doesn't use any stored assets, and so the assets directory is not included.

#### COMPONENTS

Not a built-in React directory, but one of the most commonly included, as a React app could be thought of as a collection of Components.

When structuring an app this way, it is considered good practice to keep related code as close as possible. (E.g. style for a Component in that Component's own folder, as well as any utilities not shared by any other Components.)

App.js can also be moved into its own folder here, leaving just the entry files (those Webpack needs to start: **_index.js_** to render the application to the DOM, and **_index.css_** for base style, and possibly the **_registerServiceWorker.js_** if the application is to be available offline) out in the main src directory.

Including an index.js here makes it possible to import the entire contents of the directory (all Components) by requiring `./components` alone. (By default when importing a directory, React will look for an index.js file and grab all the Components imported into it.)
  
The index.js file within each Component folder is the entry point for importing that Component, and for ease of use it should contain nothing but an export statement that points to the current topmost Component (because the topmost Component changes often during development).
    
If a Component is not reusable but a tightly-coupled child Component of another, it's good practice to nest it in its parent Component's directory. (This helps to avoid dead code when deprecating a Component.)

The Google Book Search app components directory contains eight folders, each constructing a single element of the DOM:

- **Book** creates a container for every book result returned by Google Books search and imported from /components/List as `{ ListItem }`. This folder includes an additional css file with style rules for the Book Component alone (affecting only the button container). 
- **Card** can be exported from here to create a basic Bootstrap card component.
- **Footer** creates a simple footer for **_Home.js_** and **_Saved.js_** pages to use.
- **Form** is another Bootstrap component. It exports the book search form, and includes two state change listeners:
    - `handleInputChange` which is triggered `onChange`, meaning it keeps track of user input as it happens, and in any of the form fields (`[name]` means it applies to the value of the field the user is focusing on currently), and
    - `handleFormSubmit` which is triggered `onClick` of the Search button, and is defined in /pages/Home.js and calls the `getBooks` function in the same file, which in turn passes the values entered in the form as query terms for the `getBooks` API method named in /utils/API.js.\
- **Grid**, another Bootstrap component, is a parent Component for Container, Row, and Column Components, which it exports as childern here. Doing it this way makes the use of Bootstrap components for dynamically generated content much easier and flexible.
- **Jumbotron** exports a simple Bootstrap jumbotron component to be used by /pages/Home.js to wrap the book search view's header text (as the jumbotron's children). This Component includes its own style.css (which only specifies the size of jumbotron's padding).
- **List** is a Component with two exports, `const List` which groups book search results into an unordered list, and `function ListItem` which turns each result into a list item. The List Component has its own style.css file, which specifies the font size within the List Component's paragraphs.
- **Nav** is another stateful (Bootstrap) Component. The state here allows the navbar to be responsive depending on which path is open and the width of the window. The ternary operators for each tab create a logic for which tab is to be marked as active, while wrapping each path in
    ```javascript
    <Link>
    ...
    </Link>
    ```
allows for dynamic routing (so the routes don't have to be declared before the page is rendered - [more info here](https://reacttraining.com/react-router/core/guides/philosophy)), but requires the `react-router-dom` package to be installed. (Here, only `{ Link }` is being imported for the Nav file to use.)
    
#### PAGES

These Components are separate from others in that they are route entry points, and so their best name is not where they are (as in the case of other Components), but what they do.

Pages pull all the other Components together into what's rendered when a client requests a particular route/page/view. (For that reason, this directory can also be called **routes**.)

The Google Book Search app has three pages:
- **_Home.js_** - a stateful Component with `handleInputChange`, `getBooks`, `handleFormSubmit`, and `handleBookSave` methods, which renders the app's home page, returning the Components Container, Row, Column, Jumbotron, Form (within a "Book Search" Card, calling the `handleInputChange` and `handleFormSubmit` methods), List (within a "Results" Card, changing the Home Component's state if there are results, mapping over them so they can be displayed using the Book Component, and calling the `handleBookSave` method if a particular (`this`) book's Save button is clicked), and Footer.
- **_NoMatch.js_** - stateless Component which renders a 404 page if a path not specified by the app is requested.
- **_Saved.js_** - stateful Component with `getSavedBooks` and `handleBootDelete` methods, which renders a page similar to Home, but populated with the books saved by the user. The List component is rendered within the "Saved Books" Card, with a Delete button added instead of Save with and anonymous function binding the `handleBookDelete` method to `this`. (This is how we can pass parameters to an event handler in React. Read more on [passing functions to components](https://reactjs.org/docs/faq-functions.html).)
  
#### UTILS

Utilities (which can also be called **helpers** or **packages**), is where all the helper functions that are used globally live, so the code can be kept DRY (Don't Repeat Yourself).
  
(To write DRY code, repeated logic should be exported to a singular location in **utils**. From here, it can then be imported to the parts of the application that share this logic, reusing the code without copy-pasting.)

Here, the utils folder includes only one file, **_API.js_**, which controls the entire logic for how a user can interact with the app. (Through four functions: `getBooks`, `getSavedBooks`, `deleteBook`, and `saveBook`, each of which follows a set path to perform a specified axios call.

#### App.js

This is the top file in the Components hierarchy. It controls the paths within the app by importing all the page Components (and the Nav Component), and using `{ Router }`, `{ Route }` and `{ Switch }` from the `react-router-dom` package to render the pages dynamically. `{ Switch }` checks paths in the order listed, rendering the first match. (Including NoMatch.js at the bottom of the routes list allows the 404 page to be displayed when no matches are found.)

#### index.js

Renders the application to the DOM and calls `registerServiceWorker` if used.

#### registerServiceWorker.js

When enabled, allows for caching and offline functionality.

----------------------------------

## SERVER-SIDE FILE STRUCTURE

These belong to Express (or another server of choice) and make it possible to render the (front-end) React app from the server.

The main advantage of server-side rendering (SSR) is that it allows for proper indexing of the site, but in the case of SSR React apps only the initial page is rendered from the server, while the subsequent pages load directly from the client. (The best of both worlds — the power of the initial server-side content plus the speedy subsequent loads which request just the content that is needed for future requests.)

The file tree is typical for an Express app:

### CONTROLLERS

Establish the CRUD methods. For this Google Books Search app, **_bookController.js_** interacts with the app's MongoDB database, and **_googleController.js_** makes the axios call to the Google Books API, checks the results against the database, checks the results are complete, and returns the data as JSON.

### MODELS

This app creates only one schema, specified in **_book.js_**, while **_index.js_** makes that schema available for export out of /models.

### ROUTES/API

Specify the CRUD actions depending on the route requested.

----------------------------------

#### Procfile

Procfile is a Heroku-specific text file that specifies the commands that are executed by the app on startup.

A [Procfile](https://devcenter.heroku.com/articles/procfile) can be used to declare a variety of process types, including:
- The app’s web server.
- Multiple types of worker processes.
- A singleton process, such as a clock.
- Tasks to run before a new release is deployed.

More on [deploying on Heroku here](https://devcenter.heroku.com/categories/deployment).
