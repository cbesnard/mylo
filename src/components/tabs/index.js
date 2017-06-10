import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tabs, { Tab } from 'material-ui/Tabs';
import Map from 'react-icons/lib/fa/map-o';
import List from 'react-icons/lib/fa/list-ul';
import muiThemeable from 'material-ui/styles/muiThemeable';

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};

class MyloTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    const { slideIndex } = this.state;
    return (
      <div>
        <Tabs
          value={slideIndex}
          onChange={this.handleChange}
        >
          <Tab
            icon={<Map color='black' />}
            value={0}
          />
          <Tab
            icon={<List />}
            value={1}
          />

        </Tabs>
        <SwipeableViews
          index={slideIndex}
          onChangeIndex={this.handleChange}>
          <div style={Object.assign({}, styles.slide, styles.slide1)}>
            slide n°1
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}>
            Hello
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default muiThemeable()(MyloTabs);