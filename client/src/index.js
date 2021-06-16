import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';

import {
   applyMiddleware,
   createStore
} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reducer } from './redux/reducers/userLogin';



const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
     <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
     </React.StrictMode>,
  document.getElementById('root')
);