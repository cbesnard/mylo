import {h, Component} from 'preact';
import Tabs from 'preact-material-components/Tabs';
import 'preact-material-components/Tabs/style.css';
import Map from 'react-icons/fa/map-o';
import List from 'react-icons/fa/list-ul';
import Style from './style.css'

export default class MyloTabs extends Component {
  render(){
    return (
      <div class={Style.tabs}>
        <Tabs className='demo-tabs' indicator-accent={true} icon-tab-bar={true}>
          <Tabs.Tab><List class={Style.icon}/></Tabs.Tab>
          <Tabs.Tab><Map class={Style.icon}/></Tabs.Tab>
        </Tabs>
      </div>
    );
  }
}