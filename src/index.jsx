import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastProvider } from 'react-toast-notifications';

import App from "components/App";
import createStore from "redux/create";
import "./index.scss";

const app = (
  <Provider store={createStore()}>
    <BrowserRouter>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={2500}
        placement="top-right"
      >
        <App />
      </ToastProvider>

    </BrowserRouter>
  </Provider>
);

ReactDom.render(app, document.getElementById("root"));
