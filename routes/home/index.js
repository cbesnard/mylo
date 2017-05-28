import { h, Component } from 'preact';
import style from './style';
import Tabs from '../../components/tabs';
import Category from '../../components/category';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<Category/>
				<Tabs />
			</div>
		);
	}
}
