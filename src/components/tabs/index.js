// @flow

import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tabs, { Tab } from 'material-ui/Tabs';
import MapIcon from 'react-icons/lib/fa/map-o';
import ListIcon from 'react-icons/lib/fa/list-ul';
import appStyles from 'Mylo/style/AppStyles';
import {LocationList, Map} from 'Mylo/components'
import './style.css'

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection:'column',
  },
  slide: {
    height: '100%',
    color: 'black',
    backgroundColor: '#f2F1F1',
    display: 'flex',
    flexDirection: 'column',
  },
  tabContainer: {
    height: '100%',
  },
  inkBar: {
    backgroundColor: appStyles.colors.mylo,
    height: 4,
  }
};

type Statetype = {
  slideIndex: number,
}

class MyloTabs extends Component {
  state: Statetype;

  constructor(props: any) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value: number) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    const { slideIndex } = this.state;
    return (
      <div style={styles.container}>
        <div>
          <Tabs
            value={slideIndex}
            onChange={this.handleChange}
            inkBarStyle={styles.inkBar}
            tabItemContainerStyle={{backgroundColor: 'white'}}
          >
            <Tab
              icon={<ListIcon className="icon"/>}
              value={0}
            />
            <Tab
              icon={<MapIcon className="icon"/>}
              value={1}
            />
          </Tabs>
        </div>
          <SwipeableViews
          index={slideIndex}
          style={styles.tabContainer}
          containerStyle={styles.tabContainer}
          onChangeIndex={this.handleChange}>
          <LocationList style={styles.slide} />
          <Map style={styles.slide} />
        </SwipeableViews>
      </div>
    );
  }
}

export default MyloTabs;
