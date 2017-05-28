import { Component } from 'preact';
import Fab from 'preact-material-components/Fab';
import 'preact-material-components/Fab/style.css';
import style from './style.css'
import MapMarker from 'react-icons/fa/map-marker';
import Search from 'react-icons/fa/search';

export default class Buttons extends Component {
  render() {
    return (
    <div class={style.buttonsContainer}>
      <div class={style.container}>
        <Fab ripple={true}>
          <Search class={style.icon}/>
        </Fab>
      </div>
      <div class={style.container}>
        <Fab ripple={true}>
          <MapMarker class={style.icon}/>
        </Fab>
      </div>
    </div>
    );
  }
}