import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import allReducers from './redux/reducer';
import rootSaga from './redux/saga/rootSaga';
const sagaMiddleware = createSagaMiddleware();
export let store = createStore(allReducers, applyMiddleware(sagaMiddleware));

import AppContainer from './container/App';
import withCodePush from './config/code-push';

class Root extends React.Component {
   render() {
      return (
         <Provider store={store}>
            <AppContainer />
         </Provider>
      );
   }
}

sagaMiddleware.run(rootSaga);
export default withCodePush(Root);
