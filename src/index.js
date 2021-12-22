import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { history } from './_helpers/history';
import "bootstrap";
import { configureFakeBackend } from './_helpers/fake-backend';

configureFakeBackend();

var routes = (<React.StrictMode>
  <Router>
               <Routes>
                 <Route path="/" element={App}></Route>
                 </Routes> 
              </Router>
</React.StrictMode> );

ReactDOM.render(
  routes,
  document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
