import 'semantic-ui-css/semantic.min.css';
import 'src/application.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import Layout from 'src/layout';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Layout />
    </Provider>,
    document.getElementById('app'),
  );
});
