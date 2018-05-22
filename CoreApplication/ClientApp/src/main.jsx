
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import storeFactory from './helpers/store'
import App from './components/App'


const store = storeFactory();

window.React = React
window.store = store

render( 
    <Provider store={store}>     
          <App />     
    </Provider>,
    document.getElementById('react-app')
);