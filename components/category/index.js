import {h, Component} from 'preact';
import Style from './style.css'

export default class Category extends Component {
  render(){
    return (
      <div class={Style.categoryContainer}>
        <div class={Style.category} >
          <p class={Style.categoryName}>All</p>
        </div>
      </div>
    );
  }
}