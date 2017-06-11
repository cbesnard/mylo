// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
// $FlowFixMe
import createStore from 'modules/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// $FlowFixMe
import { Tabs, Header, ActionsBar, Category } from 'components';
// $FlowFixMe
import myloTheme from 'style/MyloTheme'
import './App.css';

const styles = {
  app: {
    height: '100%',
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}

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
          <div style={styles.app}>
            <Header />
              <Category />
              <Tabs />
              <div className="buttonsContainer">
                <ActionsBar />
              </div>
          </div>
        </MuiThemeProvider>
      </Provider>
    ) : null;
  }
}

export default App;
