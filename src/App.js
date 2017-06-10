// @flow

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Header, ActionsBar, Category } from 'components';
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
  render() {
    return (
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
    );
  }
}

export default App;
