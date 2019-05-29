import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'

import initialStore from './store'

render(
  <Provider store={initialStore()}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
