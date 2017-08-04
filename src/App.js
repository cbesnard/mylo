// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMyloStore, history } from 'Mylo/modules/store';
import myloTheme from 'Mylo/style/MyloTheme';
import { Login, Homepage } from 'Mylo/routes';
import { Snackbar } from 'Mylo/components';
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
