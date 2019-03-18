// 注释部分为 react-navigation 身份验证的代码。
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './js/stores/configureStore'
// import EntryContainer from './js/containers/EntryContainer';
import RoutePage from './js/containers/route'; 
import { NetInfo } from 'react-native';
let { store, persistor } = configureStore();
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    NetInfo.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    );
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    );
  }

  handleFirstConnectivityChange = connectionInfo => {
    console.log(
      'First change, type: ' +
        connectionInfo.type +
        ', effectiveType: ' +
        connectionInfo.effectiveType,
    );}
 

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <EntryContainer /> */}
          <RoutePage />
         </PersistGate>
       </Provider>
    );
  }
}

