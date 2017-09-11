// @flow

import { red800 } from 'material-ui/styles/colors';

const GRID = 6;

const appStyles = {
  colors: {
    white: 'white',
    warningRed: red800,
    mylo: '#00c7b4',
    iconGrey: '#777',
    allCategory: '#DBDBDB',
    lightGrey: '#F2F1F1',
    loginGrey: '#EDEDED',
    grey: '#ccc',
    darkGrey: 'rgb(129,129,129)',
    black: '#333',
  },
  font: {
    size: {
      h1: 25,
      icon: 25,
    }
  },
  margins: {
    small: GRID * 2,
    medium: GRID * 3,
    large: GRID * 4,
  },
  defaultTextStyle: {
    color: '#333',
  },
};

export default appStyles;
