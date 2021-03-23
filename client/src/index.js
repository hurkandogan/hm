import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './redux/reducers/index';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
     <React.StrictMode>
        <Provider store={store}>
            <CssBaseline />
            <App />
        </Provider>
     </React.StrictMode>,
  document.getElementById('root')
);