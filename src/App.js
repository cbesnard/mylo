// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
// $FlowFixMe
import createStore from 'modules/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// $FlowFixMe
import myloTheme from 'style/MyloTheme';
// $FlowFixMe
import { Login } from 'routes';
import './App.css';

class App extends Component {
  state = {
    store: null,
  };

  componentWillMount() {
    createStore(store => this.setState({ store }));
  }

  render() {
    return this.state.store ? (
      <Provider store={this.state.store}>
        <MuiThemeProvider muiTheme={myloTheme}>
          <Login />
        </MuiThemeProvider>
      </Provider>
    ) : null;
  }
}

export default App;
