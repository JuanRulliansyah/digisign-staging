import { store } from 'modules/redux/store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from 'react-redux';
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/styles/tailwind.css";

// // layouts

// import Admin from "layouts/Admin.js";
// import Auth from "layouts/Auth.js";

// // views without layouts

// // import Landing from "views/Landing.js";
// // import Profile from "views/Profile.js";
// // import Index from "views/Index.js";
// import { store } from "modules/redux/store";
// import { appConfigs } from "configs";

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//       <Switch>
//         {/* <Redirect exact from="/" to={`${appConfigs.rootUrl}/dashboard`} /> */}
//         {/* add routes with layouts */}
//         <Route path="/admin" component={Admin} />
//         <Route path="/auth" component={Auth} />
//         {/* add routes without layouts */}
//         {/* <Route path="/landing" exact component={Landing} />
//         <Route path="/profile" exact component={Profile} />
//         <Route path="/index" exact component={Index} /> */}
//         {/* add redirect for first page */}
//         <Redirect from="*" to="/" />
//       </Switch>
//     </BrowserRouter>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
