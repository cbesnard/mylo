// @flow

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Category from './components/category';
import Tabs from './components/tabs';
import Header from './components/header';
import Buttons from './components/buttons';
import myloTheme from './style/MyloTheme'

class App extends Component {
  render() {
    return (
    <MuiThemeProvider muiTheme={myloTheme}>
      <div className="App">
        <Header />
        <div className="home">
          <Category />
          <Tabs />
          <div className="buttonsContainer">
            <Buttons />
          </div>
        </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
