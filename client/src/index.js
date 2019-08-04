// This is the entry point into the app, the file Webpack uses to render the application to the DOM.
// If registerServiceWorker is used, the rendering will use cached information for faster loading and offline functionality.

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
