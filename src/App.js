// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router'
// $FlowFixMe
import { createMyloStore, history } from 'modules/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// $FlowFixMe
import myloTheme from 'style/MyloTheme';
// $FlowFixMe
import { Login, Homepage } from 'routes';
// $FlowFixMe
import { Snackbar } from 'components';
import './App.css';

class App extends Component {
  state = {
    store: null,
  };

  componentWillMount() {
    createMyloStore(store => this.setState({ store }));
  }

  render() {
    return this.state.store ? (
      <Provider store={this.state.store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider muiTheme={myloTheme}>
            <div style={{height: '100%'}}>
              <Route exact path="/" component={Login} />
              <Route exact path="/home" component={Homepage} />
              <Snackbar />
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    ) : null;
  }
}

export default App;
